import mongoose from 'mongoose'

const financialReportSchema = new mongoose.Schema({
  code: { type: Number },
  ticker: { type: String },

  amount_current_assets: { type: Array },
  amount_non_current_assets: { type: Array },
  total_assets: { type: Array },
  short_term_liabilities: { type: Array },
  long_term_liabilities: { type: Array },
  total_liabilities: { type: Array },
  ownership_amount: { type: Array },
  sales_reveneu: { type: Array },
  cost_sales: { type: Array },
  total_profit_loss: { type: Array },
  other_income_rigths_interest_rent_dividends: { type: Array },
  cost_amount: { type: Array },
  gain_loss: { type: Array },
  other_gain_loss: { type: Array },
  income_tax_expense: { type: Array },
  net_profit_loss_for_period: { type: Array },
  share_book_price: { type: Array },
  total_supply: { type: Array },
})



const FinancialReportModel = mongoose.model("FinancialReport", financialReportSchema)


export default FinancialReportModel