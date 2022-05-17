import { DocumentDefinition } from "mongoose"
import StockListModel, { StockListDocument } from "../models/stock_list.model";
import CustomError from "../utils/error"
// < -------------------------------------------------------------------------------------> // 
export async function create(input: DocumentDefinition<Omit<StockListDocument, "createdAt" | "updatedAt">>) {
  const result = await StockListModel.create(input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
// < -------------------------------------------------------------------------------------> // 
export async function find() {
  const result = await StockListModel.find()
  if (!result) {
    throw new CustomError('not found', 400)
  }

}
// < -------------------------------------------------------------------------------------> // 
export async function findByCode(findCode: number) {
  const result = await StockListModel.findOne({ code: findCode })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result
}
// < -------------------------------------------------------------------------------------> // 
export async function findByCodeAndUpdate(findCode: number, input: any) {
  const result = await StockListModel.findOneAndUpdate({ code: findCode }, input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result
}
// < -------------------------------------------------------------------------------------> // 
export async function findByCodeAndDelete(findCode: number) {
  const result = await StockListModel.findOneAndDelete({ code: findCode })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result
}
// < -------------------------------------------------------------------------------------> // 