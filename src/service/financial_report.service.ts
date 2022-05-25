import { DocumentDefinition } from "mongoose"
import FinancialReportModel from "../models/financial_report.model"
import CustomError from "../utils/error"

// < ------------------------------------------------------------------------------------- > // 
export async function create(input: any) {
  const result = await FinancialReportModel.create(input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
// < ------------------------------------------------------------------------------------- > // 
export async function createNext(input: any) {
  const find = await FinancialReportModel.findOne({ code: input.code })

  if (!find) {
    throw new CustomError('not found', 400)
  }
  return find

}
// < ------------------------------------------------------------------------------------- > // 
export async function findByCode(input: any) {
  const find = await FinancialReportModel.findOne({ code: input.code })
  if (find) {
    const a = find.amount_current_assets.push(input.amount_current_assets)
    console.log(a.length);
    const update = await FinancialReportModel.updateOne({ code: input.code }, a)
    return update
  }
  return find



}