import productValidationSchema from "@/helpers/productValidationSchema"
import IProduct from "@/interfaces/Product.interface"
import Product from "@/models/Product.model"

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const handle = params.handle
  const product = await Product.findOne({ handle })
  const productData = product?.toJSON() ?? null
  if (!productData) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }
  return Response.json(productData)
}

export async function PATCH(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const handle = params.handle
  const productData: Partial<IProduct> = await request.json()
  if (!productData) {
    return Response.json({ message: "Missing body" }, { status: 400 })
  }
  if (productData.handle && productData.handle !== handle) {
    return Response.json({ message: "You can't change the handle" }, { status: 400 })
  }
  try {
    productValidationSchema.partial().strict().parse(productData)
  } catch {
    return Response.json({ message: "Invalid body" }, { status: 400 })
  }
  const product = await Product.findOneAndUpdate({ handle }, productData, { new: true })
  if (!product) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }
  return Response.json(product.toJSON())
}

export async function DELETE(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const handle = params.handle
  const product = await Product.findOneAndDelete({ handle })
  if (!product) {
    return Response.json({ message: "Not found" }, { status: 404 })
  }
  return Response.json({ message: "Removed" })
}
