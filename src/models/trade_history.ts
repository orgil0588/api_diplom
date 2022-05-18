import mongoose from "mongoose";



export interface TradeHistoryDocument extends mongoose.Document {
  ticker: string,
  code: number,
  open: number,
  high: number,
  low: number,
  close: number,
  change: number,
  volume: number,
  date: string,
}

const tradeHistorySchema = new mongoose.Schema({
  ticker: { type: String, required: true },
  code: { type: Number, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number },
  change: { type: Number, required: true },
  volume: { type: Number, required: true },
  date: { type: String, required: true }

}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })



const TradeHistoryModel = mongoose.model("TradeHistory", tradeHistorySchema)



export default TradeHistoryModel