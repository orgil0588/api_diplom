import { Request, Response } from "express";
import logger from "../utils/logger"
import { CreateTradeHistoryInput } from "../schema/trade_history.schema";
import { create, update, findByCode, find, findOneStockHistory } from "../service/trade_history.service";



export async function createTradeHistoryHandler(req: Request<{}, {}, CreateTradeHistoryInput["body"]>, res: Response) {
  try {
    const history = await create(req.body)// call create stock service
    return res.send({
      status: 200,
      data: history
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

export async function findTradeHistoryHandler(req: Request, res: Response) {
  try {
    const history = await find()// call create stock service
    return res.send({
      status: 200,
      data: history
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
export async function crawlerTradeHistoryHandler(req: Request<{}, {}, CreateTradeHistoryInput["body"]>, res: Response) {
  try {
    const find: any = await findByCode(req.body.code, req.body.date)
    if (find) {
      const history = await update(req.body, find)
      return res.send({
        status: 200,
        data: history
      })
    }
    const history = await create(req.body)
    return res.send({
      status: 200,
      data: history
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

export async function findOneTradeHistoryHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const history = await findOneStockHistory(findCode)// call create stock service
    return res.send({
      status: 200,
      data: history
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