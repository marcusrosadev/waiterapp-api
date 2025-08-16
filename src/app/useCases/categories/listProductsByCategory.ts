import type { Request, Response } from "express";
import { Product } from "../../models/Product.ts";


export async function listProductsByCategory(req: Request, res: Response) {

  try {
    const { categoryId } = req.params
    const products = await Product.find().where('category').equals(categoryId);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error listing products!' });
  }
}
