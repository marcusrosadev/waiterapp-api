import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function deleteProduct(req: Request, res: Response) {

  try {
    const { productId } = req.params;

    await Product.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product!' });
  }
}
