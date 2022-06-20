import mongoose from "mongoose";



export interface StockListDocument extends mongoose.Document {
    company: string,
    ticker: string,
    code: number,
    class: number,
    createdAt: Date,
    updatedAt: Date,
    image: string,
    circulating_supply: number,
    total_supply: number,
    industry: string,
    sector: string,
    is_top: boolean

}

const mergedListSchema = new mongoose.Schema({
    code: { type: Number, unique: true, required: true },
    ticker: { type: String, unique: true, required: true },
    image: { type: String },
    circulating_supply: { type: Number },
    total_supply: { type: Number },
    industry: { type: String },
    sector: { type: String },
    is_top: { type: Boolean },
    company: { type: String, unique: true, required: true },



    class: { type: Number, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

mergedListSchema.virtual('history', {
    ref: 'TradeHistory',
    localField: "code",
    foreignField: 'code',
    justOne: false
})

const MergedListModel = mongoose.model("MergedList", mergedListSchema)



export default MergedListModel