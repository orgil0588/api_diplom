import { Request, Response } from "express";
import { CreateStockListInput } from "../schema/stock_list.schema";
import { create, find, findByCode, findByCodeAndDelete, findByCodeAndUpdate } from "../service/stock_list.service";
import logger from "../utils/logger"

// < -------------------------------------------------------------------------------------> // 
export async function createStockHandler(req: Request<{}, {}, CreateStockListInput["body"]>, res: Response) {
  try {
    const stock = await create(req.body)// call create stock service
    return res.send({
      status: 200,
      data: stock
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
// < -------------------------------------------------------------------------------------> // 
export async function findStockHandler(req: Request, res: Response) {
  try {
    const stock = await find()
    return res.send({
      status: 200,
      data: stock
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
// < -------------------------------------------------------------------------------------> // 
export async function findOnceStockHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const stock = await findByCode(findCode)
    return res.send({
      status: 200,
      data: stock
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
// < ------------------------------------------------------------------------------------- > // 
export async function updateStockHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const stock = await findByCodeAndUpdate(findCode, req.body)
    return res.send({
      status: 200,
      data: stock
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
// < -------------------------------------------------------------------------------------> // 
export async function deleteStockHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const stock = await findByCodeAndDelete(findCode)
    return res.send({
      status: 200,
      data: stock
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
// < -------------------------------------------------------------------------------------> // 