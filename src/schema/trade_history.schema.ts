import { object, string, number, TypeOf } from "zod"

export const createTradeHistorySchema = object({
  body: object({
    ticker: string({
      required_error: "Company is required"
    }),
    code: number({
      required_error: "Ticker is required"
    }),
    open: number({
      required_error: 'Code is required'
    }),
    high: number({
      required_error: "Class is required"
    }),
    low: number({
      required_error: "Class is required"
    }),
    close: number({
      required_error: "Class is required"
    }),
    change: number({
      required_error: "Class is required"
    }),
    volume: number({
      required_error: "Class is required"
    }),
    date: string({
      required_error: "Class is required"
    }),

  })
})

export type CreateTradeHistoryInput = TypeOf<typeof createTradeHistorySchema>;