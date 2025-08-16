import type { Request, Response } from "express";
import { Order } from "../../models/Order.ts";


export async function cancelOrder(req: Request, res: Response) {

  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    res.sendStatus(204);
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Error canceling order!' });
  }
}
