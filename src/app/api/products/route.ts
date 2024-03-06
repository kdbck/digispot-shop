import Product from "@/models/Product.model"
import connectToDb from "@/helpers/connectToDb"
import productValidationSchema from "@/helpers/productValidationSchema"
import { MongoServerError } from "mongodb"

const isMongoServerError = (error: any): error is MongoServerError => {
  return (
    error &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'MongoServerError'
  )
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const category = searchParams.get("category")
  await connectToDb()
  const products = await Product.find({
    ...(category ? { category } : {})
  })
  return Response.json(products.map(product => product.toJSON()))
}

export async function POST(request: Request) {
  await connectToDb()
  let body: object
  try {
    body = await request.json()
  } catch (error) {
    return Response.json({ message: "Invalid JSON" }, { status: 400 })
  }
  try {
    productValidationSchema.strict().parse(body)
  } catch {
    return Response.json({ message: "Invalid body" }, { status: 400 })
  }
  try {
    const product = await Product.create(body)
    return Response.json(product.toJSON())
  } catch (error) {
    if (isMongoServerError(error)) {
      return Response.json({ message: error.message, code: error.code }, { status: 400 })
    }
    return Response.json({ message: "Internal error" }, { status: 500 })
  }
}
