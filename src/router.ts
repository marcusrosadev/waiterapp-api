import path from "node:path"
import { fileURLToPath } from 'node:url';

import { Router } from "express";
import multer from "multer";

import { listCategories } from "./app/useCases/categories/listCategories.js";
import { createCategory } from "./app/useCases/categories/createCategory.ts";
import { listProducts } from "./app/useCases/products/listProducts.ts";
import { createProduct } from "./app/useCases/products/createProduct.ts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory.ts";
import { listOrders } from "./app/useCases/orders/listOrders.ts";
import { createOrder } from "./app/useCases/orders/createOrder.ts";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus.ts";
import { cancelOrder } from "./app/useCases/orders/cancelOrder.ts";
import { deleteProduct } from "./app/useCases/products/deleteProduct.ts";
import { deletecategory } from "./app/useCases/categories/deleteCategory.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Get product by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel order
router.delete('/orders/:orderId', cancelOrder);

// Delete product
router.delete('/products/:productId', deleteProduct);

// Delete category
router.delete('/categories/:categoryId', deletecategory);
