import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sampleProductSchema = new Schema(
  {
    Price: {
      type: String,
      required: true,
    },
    Inventory: {
      type: Number,
      required: true,
    },
    Sort: {
      type: Number,
      required: true,
    },
    ItemName: {
      type: String,
      required: true,
    },
    Id: {
      type: Number,
      required: true,
    },
    IsActive: {
      type: String,
      required: true,
    },
    IsSaleable: {
      type: String,
      required: true,
    },
    SKUCODE: {
      type: String,
      required: true,
    },
    AId: {
      type: Number,
      required: true,
    },
    ShortDescription: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    ItemImage: {
      type: String,
      required: true,
    },
    WebImage: {
      type: String,
      required: true,
    },
    UnitSize: {
      type: Number,
      required: true,
    },
    UOM: {
      type: String,
      required: true,
    },
    PackSize: {
      type: Number,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    MaxOrderQuantity: {
      type: Number,
      required: true,
    },
    Mrp: {
      type: String,
      required: true,
    },
    DiscountAmount: {
      type: String,
      required: true,
    },
    SearchTerm: {
      type: String,
      required: true,
    },
    MinOrderQuantity: {
      type: String,
      required: true,
    },
    Quantity: {
      type: String,
      required: true,
    },
    TotalCount: {
      type: String,
      required: true,
    },
    EnId: {
      type: String,
      required: true,
    },
    IsRestricted: {
      type: String,
      required: true,
    },
    CategoryCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("sampleProducts", sampleProductSchema);
