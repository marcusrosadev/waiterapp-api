import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath,
      ingredients: ingredients ? JSON.parse(ingredients) : []
    })

    res.status(201).json(product);
  } catch(error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: 'An error occurred while creating the product.'
    });
  }
}
