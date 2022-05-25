import { Request, Response } from "express";
import { create, createNext, findByCode } from "../service/financial_report.service";
import logger from "../utils/logger"

// < ------------------------------------------------------------------------------------- > // 
export async function createFinancialReportHandler(req: Request, res: Response) {
  try {
    const info = await findByCode(req.body)// call create info service
    console.log(info);
    if (!info) {
      const result = await create(req.body)
      return res.send({
        status: 200,
        data: result
      })
    }
    const result = await createNext(req.body)



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
