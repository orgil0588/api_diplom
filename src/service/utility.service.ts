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
  interface initQuery {
    class: any,
    sort: any,
    offset: any,

  }
  const initQuery: initQuery = {
    class: query.split('&').length > 0 ? query.split('&')[0].split('=')[1] : "all",
    sort: query.split('&').length > 1 ? query.split('&')[1].split('=')[1] : 'marketcap',
    offset: query.split('&').length > 2 ? parseInt(query.split('&')[2].split('=')[1]) : 20,
  }

  switch (initQuery.class) {
    case 'all':
      initQuery.class = {
        begin: 0,
        end: 4,
        is_top: {
          $exists: true, $ne: null
        }
      }
      break;
    case 'a':
      initQuery.class = {
        begin: 0,
        end: 2,
        is_top: {
          $exists: true, $ne: null
        }
      }
      break;
    case 'b':
      initQuery.class = {
        begin: 1,
        end: 3,
        is_top: {
          $exists: true, $ne: null
        }
      }
      break;
    case 'c':
      initQuery.class = {
        begin: 2,
        end: 4,
        is_top: {
          $exists: true, $ne: null
        }
      }
      break;
    case 'top':
      initQuery.class = {
        begin: 0,
        end: 4,
        is_top: "TRUE"
      }
  }
  switch (initQuery.sort) {
    case 'marketcap':
      initQuery.sort = {
        name: "marketcap",
        asc: -1
      }
      break
    case 'ticker':
      initQuery.sort = {
        name: "company",
        asc: 1
      }
      break
    case 'change':
      initQuery.sort = {
        name: "history.change",
        asc: -1
      }
      break
    case 'close':
      initQuery.sort = {
        name: "history.close",
        asc: -1
      }
      break
    case 'volume':
      initQuery.sort = {
        name: "history.volume",
        asc: -1
      }
    case 'industry':
      initQuery.sort = {
        name: "info.industry",
        asc: 1
      }
    case 'sector':
      initQuery.sort = {
        name: "info.sector",
        asc: 1
      }
      break
  }
  initQuery.offset = {
    begin: initQuery.offset - 20,
    end: initQuery.offset
  }

  console.log(initQuery);
  const length = await StockListModel.aggregate([{
    "$lookup": {
      'from': 'generalinfos',
      'localField': 'code',
      'foreignField': 'code',
      'as': 'info',
      "pipeline": [
        {
          $project: {
            _id: 0,
            circulating_supply: 0,
            date: 0,
          }
        }

      ]
    }
  }, {
    $match: {
      $and: [{ class: { $gt: initQuery.class.begin, $lt: initQuery.class.end } }, {
        "info.is_top": initQuery.class.is_top
      }]
    }
    // $exists: true, $ne: null
    // $match: { "$info.is_top": "TRUE" }
  },]).count('count')
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
          },
          {
            $project: {
              _id: 0,
              ticker: 0,
              code: 0,
              date: 0,
              __v: 0
            }
          }
        ]
      }
    }, {
      "$lookup": {
        'from': 'generalinfos',
        'localField': 'code',
        'foreignField': 'code',
        'as': 'info',
        "pipeline": [
          {
            $project: {
              _id: 0,
              circulating_supply: 0,
              date: 0,
            }
          }

        ]
      }
    },
    {
      $unwind: "$info"
    },
    {
      $unwind: "$history"
    },
    {
      $addFields: {
        marketcap: {
          $multiply: [
            {
              $toInt: "$info.total_supply"
            }, "$history.close"
          ]
        }
      }
    },
    {
      $match: {
        $and: [{ class: { $gt: initQuery.class.begin, $lt: initQuery.class.end } }, {
          "info.is_top": initQuery.class.is_top
        }]
      }
      // $exists: true, $ne: null
      // $match: { "$info.is_top": "TRUE" }
    },
    {
      $sort: {
        [initQuery.sort.name]: initQuery.sort.asc
      }
    },

    { $skip: initQuery.offset.begin },
    { $limit: initQuery.offset.end }




  ])

  if (!result) {
    throw new CustomError('not found', 400)
  }
  const pagination = {
    length: length[0].count,
    skip: initQuery.offset.begin,
    limit: initQuery.offset.end
  }
  console.log(length);
  return { result, pagination }
}