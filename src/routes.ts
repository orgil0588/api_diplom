import { Express, Request, Response } from 'express'
import { createGeneralInfoHandler, findGeneralInfoHandler, findOnceGeneralInfoHandler, updateGeneralInfoHandler, deleteGeneralInfoHandler } from './controller/general_info.controller'
import { findStockHandler, createStockHandler, findOnceStockHandler, updateStockHandler, deleteStockHandler } from './controller/stock_list.controller'
import { crawlerTradeHistoryHandler, createTradeHistoryHandler, findOneTradeHistoryHandler, findTradeHistoryHandler } from './controller/trade_history.controller'
import { topFourHandler } from './controller/utility.controller'
import validateResource from "./middleware/validateResource"
import { createStockListSchema } from './schema/stock_list.schema'
import { createGeneralInfoSchema } from "./schema/general_info.schema"
import { createFinancialReportHandler } from './controller/financial_report.controller'
function routes(app: Express) {

  app.get('/', (req: Request, res: Response) => {
    res.send({
      status: 200,
      data: {
        msg: "success"
      }
    })
  })
  // api/stock_list/
  app.post('/api/stock_list/', validateResource(createStockListSchema), createStockHandler)
  app.get('/api/stock_list/', findStockHandler)
  app.get('/api/stock_list/:code', findOnceStockHandler)
  app.put('/api/stock_list/:code', updateStockHandler)
  app.delete('/api/stock_list/:code', deleteStockHandler)

  // < ----------------------------------------------------- > //
  // /api/general_info/
  app.post('/api/general_info/', validateResource(createGeneralInfoSchema), createGeneralInfoHandler)
  app.get('/api/general_info/', findGeneralInfoHandler)
  app.get('/api/general_info/:code', findOnceGeneralInfoHandler)
  app.put('/api/general_info/:code', updateGeneralInfoHandler)
  app.delete('/api/general_info/:code', deleteGeneralInfoHandler)

  // < ----------------------------------------------------- > //
  // /api/trade_history/
  app.post('/api/trade_history/', createTradeHistoryHandler)
  app.post('/api/trade_history/crawler/', crawlerTradeHistoryHandler)
  app.get('/api/trade_history/', findTradeHistoryHandler)
  app.get('/api/trade_history/:code', findOneTradeHistoryHandler)

  // /api/financial_report/
  app.post('/api/financial_report/', createFinancialReportHandler)

  // /api/utils/top_four
  app.get('/api/utils/top_four/:code', topFourHandler)

}

export default routes