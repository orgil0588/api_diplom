import mongoose from "mongoose";



export interface StockListDocument extends mongoose.Document {
  company: string,
  ticker: string,
  code: number,
  class: number,
  createdAt: Date,
  updatedAt: Date
}

const stockListSchema = new mongoose.Schema({
  company: { type: String, unique: true, required: true },

  ticker: { type: String, unique: true, required: true },
  code: { type: Number, unique: true, required: true },
  class: { type: Number, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

stockListSchema.virtual('general', {
  ref: 'GeneralInfo',
  localField: "code",
  foreignField: 'code',
  justOne: false
})

const StockListModel = mongoose.model("StockList", stockListSchema)



export default StockListModel