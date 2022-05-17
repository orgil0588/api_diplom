import { DocumentDefinition } from "mongoose"
import GeneralInfoModel, { GeneralInfoDocument } from "../models/general_info.model"
import CustomError from "../utils/error"


export async function create(input: DocumentDefinition<Omit<GeneralInfoDocument, "createdAt" | "updatedAt">>) {
  const result = await GeneralInfoModel.create(input)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}

export async function find() {
  const result = await GeneralInfoModel.find()
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
export async function findByCode(findCode: number) {
  const result = await GeneralInfoModel.findOne({
    code: findCode
  })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
export async function findByCodeAndUpdate(findCode: number, body: any) {
  const result = await GeneralInfoModel.findOneAndUpdate({
    code: findCode
  }, body)
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}
export async function findByCodeAndDelete(findCode: number) {
  const result = await GeneralInfoModel.findOneAndDelete({
    code: findCode
  })
  if (!result) {
    throw new CustomError('not found', 400)
  }
  return result

}