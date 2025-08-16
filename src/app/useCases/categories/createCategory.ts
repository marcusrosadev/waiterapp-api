import type { Request, Response } from "express";
import { Category } from "../../models/Category.ts";

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body

    const category = await Category.create({ icon, name });

    return res.status(201).json(category);
  } catch(error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      error: 'An error occurred while creating the category.'
    });
  }
}
