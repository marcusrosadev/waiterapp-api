import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";


export async function listOrders(req: Request, res: Response) {

  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('products.product');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error listing orders!' });
  }
}
