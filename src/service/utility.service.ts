import c from "config"
import e from "express"
import { DocumentDefinition } from "mongoose"
import GeneralInfoModel from "../models/general_info.model"
import StockListModel from "../models/stock_list.model"
import TradeHistoryModel from "../models/trade_history"
import CustomError from "../utils/error"

export async function topFour(findCode: number) {
  const result = await TradeHistoryModel.aggregate([
    {
      '$sort': {
        'date': -1
      }
    },
    {
      '$match': {
        code: findCode
      }
    },
    {
      '$limit': 1
    }, {
      '$lookup': {
        'from': 'generalinfos',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'info'
      }
    }
  ])
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}

export async function marketInfo(findCode: number) {
  const result = await TradeHistoryModel.aggregate([
    {
      '$sort': {
        'date': -1
      }
    },
    {
      '$match': {
        code: findCode
      }
    },
    {
      '$limit': 1
    }, {
      '$lookup': {
        'from': 'financialreports',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'report'
      },
    },
    {
      '$lookup': {
        'from': 'stocklists',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'lists'
      }
    }
  ])
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
export async function tickerList() {
  const result = await StockListModel.aggregate([
    {
      "$lookup": {
        'from': 'tradehistories',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'history',
        "pipeline": [
          {
            $sort: { date: -1 }
          },
          {
            $limit: 1
          }
        ]
      }
    }

  ])

  // .select({ code: 1, ticker: 1, company: -1, _id: -1, class: -1 })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  if (result) {
    return result
  }

}
export async function marketList(query: any) {
  console.log(query);

  const initQuery = {
    offset: query.split('&')[0].split('=')[1],
    sort: query.split('&')[1].split('=')[1],
    class: query.split('&')[2].split('=')[1]
  }
  console.log(initQuery);
  const result = await StockListModel.aggregate([
    {
      "$lookup": {
        'from': 'tradehistories',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'history',
        "pipeline": [
          {
            $sort: { date: -1 }
          },
          {
            $limit: 1
          }
        ]
      }
    },
    {
      "$lookup": {
        'from': 'generalinfos',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'info',
      }
    }

  ])
  let arr: any[] = []
  result.map(element => {
    let obj = {
      code: element.code,
      ticker: element.ticker,
      company: element.company,
      class: element.class,
      is_top: element.info[0].is_top,
      image: element.info[0].image,
      close: element.history.length !== 0 ? element.history[0].close : 0,
      change: element.history.length !== 0 ? element.history[0].change : 0,
      volume: element.history.length !== 0 ? element.history[0].volume : 0,
      marketcap: element.history.length !== 0 ? element.info[0].total_supply * element.history[0].close : 0,
      industry: element.info[0].industry,
      sector: element.info[0].sector,
    }
    arr.push(obj)
  })
  let sorted: any[] = []
  let querying: any[] = []

  if (initQuery.sort) {
    switch (initQuery.sort) {
      case 'marketcap':
        arr.sort((a, b) => {
          return b.marketcap - a.marketcap
        })
        break;
      case 'ticker':
        arr.sort((a, b) => {
          return a.ticker.localeCompare(b.ticker)
        })
    }
  }

  if (initQuery.class) {
    switch (initQuery.class) {
      case 'a':
        querying.push(...arr.filter((item) => item.class === 1))
        break;
      case 'b':
        querying.push(...arr.filter((item) => item.class === 2))
        break;
      case 'c':
        querying.push(...arr.filter((item) => item.class === 3))
        break;
      case 'all':
        querying.push(...arr)
        break;
      case 'top':
        querying.push(...arr.filter((item) => item.is_top === "TRUE"))
        break;
    }
  }
  if (initQuery.offset) {
    for (let i = initQuery.offset - 20; i < initQuery.offset; i++) {
      sorted.push(arr[i])
    }
  }

  if (!arr) {
    throw new CustomError('not found', 400)
  }

  const paginate = {
    sorted: sorted,
    length: querying.length
  }
  return paginate
}