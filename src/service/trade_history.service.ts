import { DocumentDefinition } from "mongoose"
import TradeHistoryModel, { TradeHistoryDocument } from "../models/trade_history"
import { datePatch } from "../utils/date_patch"
import CustomError from "../utils/error"
// < -------------------------------------------------------------------------------------> // 
export async function create(input: DocumentDefinition<TradeHistoryDocument>) {
  const result = await TradeHistoryModel.create(input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}

export async function find() {
  const result = await TradeHistoryModel.find()
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result
}

export async function update(input: DocumentDefinition<TradeHistoryDocument>, find: any) {
  const result = await TradeHistoryModel.findByIdAndUpdate({ _id: find._id }, input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result
}
export async function findByCode(code: number, date: string) {
  const result = await TradeHistoryModel.findOne({ code: code, date: date })
  //628467f5adb3cd08885c4061
  return result
}
export async function findOneStockHistory(findCode: number) {
  const result = await TradeHistoryModel.find({ code: findCode })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return datePatch(result)
}