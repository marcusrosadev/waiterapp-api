import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE'
      })
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch(error) {
    console.error('Error changing order status:', error);
    res.status(500).json({
      error: 'An error occurred while changing order status.'
    });
  }
}
