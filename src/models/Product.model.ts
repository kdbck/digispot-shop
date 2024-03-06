import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  }
})

const Product = models.Product || model('Product', ProductSchema);

export default Product;
