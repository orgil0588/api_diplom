import { setDefaultResultOrder } from "dns";
import { Request, Response } from "express";
import { marketInfo, topFour, tickerList, marketList } from "../service/utility.service";
import logger from "../utils/logger"


export async function topFourHandler(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const result: any = await topFour(findCode);
    return res.send({
      status: 200,
      data: result
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
export async function marketTopInfo(req: Request, res: Response) {
  try {
    const findCode: number = parseInt(req.params.code)
    const result: any = await marketInfo(findCode);
    return res.send({
      status: 200,
      data: result
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
export async function tickerListHandler(req: Request, res: Response) {
  try {
    const result = await tickerList()
    return res.send({
      status: 200,
      data: result
    })
  } catch (error) {
    console.error(error)
  }
}

export async function marketListHandler(req: Request, res: Response) {
  try {
    const result = await marketList()
    return res.send({
      status: 200,
      data: result
    })
  } catch (error) {
    console.error(error)
  }
}