import * as zod from 'zod'

const productValidationSchema = zod.object({
  name: zod.string().min(3).max(64),
  handle: zod.string().min(3).max(64),
  price: zod.number().min(0),
  category: zod.string().min(3).max(64),
  inventory: zod.number().min(0),
  isAvailable: zod.boolean()
})

export default productValidationSchema
