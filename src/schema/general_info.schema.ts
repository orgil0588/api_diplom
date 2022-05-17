import { object, string, number, TypeOf } from "zod"

export const createGeneralInfoSchema = object({
  body: object({
    company: string({
      required_error: "Company is required"
    }),
    ticker: string({
      required_error: "Ticker is required"
    }),
    code: number({
      required_error: 'Code is required'
    }),
    class: number({
      required_error: "Class is required"
    })
  })
})

export type CreateStockListInput = TypeOf<typeof createGeneralInfoSchema>;