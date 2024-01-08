"use client"
import { FullProductCart } from "@/content/ecommerce/cart/types";

export type CartTableRowProps = {
  data: FullProductCart;
  handleUpdateProduct: (product: FullProductCart) => void;
  deleteProduct: (productCartId: number) => Promise<void>;
}