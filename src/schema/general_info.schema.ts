import { object, string, number, TypeOf, boolean } from "zod"

export const createGeneralInfoSchema = object({
  body: object({
    code: number({
      required_error: "Company is required"
    }),
    image: string({
      required_error: "Ticker is required"
    }),
    circulating_supply: number({
      required_error: 'Code is required'
    }),
    total_supply: number({
      required_error: "Class is required"
    }),
    industry: string({
      required_error: "Ticker is required"
    }),
    sector: string({
      required_error: "Ticker is required"
    }),
    is_top: boolean({
      required_error: "isTop is required"
    })
  })
})

export type CreateGeneralInfoInput = TypeOf<typeof createGeneralInfoSchema>;