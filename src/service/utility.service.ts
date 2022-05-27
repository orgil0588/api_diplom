import { DocumentDefinition } from "mongoose"
import { pipeline } from "stream"
import { arrayBuffer } from "stream/consumers"
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