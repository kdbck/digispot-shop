interface IProduct {
  _id: string;
  name: string;
  handle: string;
  category: string;
  price: number;
  inventory: number;
  isAvailable: boolean;
  __v: number;
}

export default IProduct;
