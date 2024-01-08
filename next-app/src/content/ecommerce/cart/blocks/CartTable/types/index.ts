"use client"
import { FullCart, FullProductCart } from "../../../types"

export type CartTableProps = {
  data: FullCart['productCarts'];
  handleUpdateProduct: (product: FullProductCart) => void;
  deleteProduct: (productCartId: number) => Promise<void>;
}