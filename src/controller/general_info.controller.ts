import { Request, Response } from "express";
import { CreateGeneralInfoInput } from "../schema/general_info.schema";
import { create, find, findByCode, findByCodeAndUpdate, findByCodeAndDelete } from "../service/general_info.service";

import logger from "../utils/logger"


export async function createGeneralInfoHandler(req: Request<{}, {}, CreateGeneralInfoInput["body"]>, res: Response) {
  try {
    const info = await create(req.body)// call create info service
    return res.send({
      status: 200,
      data: info
    })
  } catch (error: any) {
    logger.error(error)
    return res.send({
      status: 400,
      data: {
        error: error.message
      }
    })
  }
}
export async function findGeneralInfoHandler(req: Request, res: Response) {
  try {
    const info = await find()// call create info service
    return res.send({
      status: 200,
      data: info
    })
  } catch (error: any) {
    logger.error(error)
    return res.send({
      status: 400,
      data: {
        error: error.message
      }
    })
  }
}

export async function findOnceGeneralInfoHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const info = await findByCode(findCode)// call create info service
    return res.send({
      status: 200,
      data: info
    })
  } catch (error: any) {
    logger.error(error)
    return res.send({
      status: 400,
      data: {
        error: error.message
      }
    })
  }
}
export async function updateGeneralInfoHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const info = await findByCodeAndUpdate(findCode, req.body)// call create info service
    return res.send({
      status: 200,
      data: info
    })
  } catch (error: any) {
    logger.error(error)
    return res.send({
      status: 400,
      data: {
        error: error.message
      }
    })
  }
}
export async function deleteGeneralInfoHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const info = await findByCodeAndDelete(findCode)// call create info service
    return res.send({
      status: 200,
      data: info
    })
  } catch (error: any) {
    logger.error(error)
    return res.send({
      status: 400,
      data: {
        error: error.message
      }
    })
  }
}