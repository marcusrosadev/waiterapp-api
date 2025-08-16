import type { Request, Response } from "express";
import { Order } from "../../models/Order.ts";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body

    const order = await Order.create({ table, products });

    return res.status(201).json(order);
  } catch(error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'An error occurred while creating the order.'
    });
  }
}
