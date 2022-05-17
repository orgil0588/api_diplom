import mongoose from "mongoose";



export interface GeneralInfoDocument extends mongoose.Document {
  company: string,
  ticker: string,
  code: number,
  class: number,
  image: string,
  circulating_supply: number,
  total_supply: number,
  industry: string,
  sector: string,
  is_top: boolean
  createdAt: Date,
  updatedAt: Date
}

const generalInfoSchema = new mongoose.Schema({
  company: { type: String, unique: true, required: true },
  ticker: { type: String, unique: true, required: true },
  code: { type: Number, unique: true, required: true },
  class: { type: Number, required: true },
  image: { type: String },
  circulating_supply: { type: Number },
  total_supply: { type: Number },
  industry: { type: String },
  sector: { type: String },
  is_top: { type: Boolean },

}, { timestamps: true })

const GeneralInfoModel = mongoose.model("GeneralInfo", generalInfoSchema)


export default GeneralInfoModel