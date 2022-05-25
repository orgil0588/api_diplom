import { Request, Response } from "express";
import { topFour } from "../service/utility.service";
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