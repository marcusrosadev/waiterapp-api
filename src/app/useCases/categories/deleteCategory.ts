import type { Request, Response } from "express";
import { Category } from "../../models/Category.ts";

export async function deletecategory(req: Request, res: Response) {

  try {
    const { categoryId } = req.params;

    await Category.findByIdAndDelete(categoryId);

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category!' });
  }
}
