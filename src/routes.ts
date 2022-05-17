import { Express, Request, Response } from 'express'
import { createGeneralInfoHandler, findGeneralInfoHandler, findOnceGeneralInfoHandler, updateGeneralInfoHandler, deleteGeneralInfoHandler } from './controller/general_info.controller'
import { findStockHandler, createStockHandler, findOnceStockHandler, updateStockHandler, deleteStockHandler } from './controller/stock_list.controller'
import validateResource from "./middleware/validateResource"
import { createStockListSchema } from './schema/stock_list.schema'
function routes(app: Express) {

  app.get('/', (req: Request, res: Response) => {
    res.send({
      status: 200,
      data: {
        msg: "success"
      }
    })
  })
  // api/stock_list/create
  app.post('/api/stock_list/', validateResource(createStockListSchema), createStockHandler)
  app.get('/api/stock_list/', findStockHandler)
  app.get('/api/stock_list/:code', findOnceStockHandler)
  app.put('/api/stock_list/:code', updateStockHandler)
  app.delete('/api/stock_list/:code', deleteStockHandler)

  // < ----------------------------------------------------- > //
  app.post('/api/general_info/', createGeneralInfoHandler)
  app.get('/api/general_info/', findGeneralInfoHandler)
  app.get('/api/general_info/:code', findOnceGeneralInfoHandler)
  app.put('/api/general_info/:code', updateGeneralInfoHandler)
  app.delete('/api/general_info/:code', deleteGeneralInfoHandler)



}

export default routes