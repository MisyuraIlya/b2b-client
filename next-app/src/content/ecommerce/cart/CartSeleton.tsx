"use client"

import { FC } from "react"
import Skeleton from "@mui/material/Skeleton"
import { useCartStore } from "@/context/CartContext/CartContext"
import { MuiStyles } from "@/types/mui"

const styles: MuiStyles = {
  skeletonRow: {
    height: 40,
    transform: 'none',
    width: '100%',
    my: 2.25
  },
  skeletonHeader: {
    height: 20,
    mb: 1.25,
    mt: 5
  }
}

const CartSkeleton: FC = () => {
  const { cart } = useCartStore();

  const arr = new Array(cart?.productCarts.length).fill(null).map((el, index) => index);
  return (
    <>
      <Skeleton animation="wave" sx={styles.skeletonHeader} />
      {arr.map((el) => (
        <Skeleton key={el} animation="wave" sx={styles.skeletonRow} />
      ))}
    </>
  )
}

export default CartSkeleton;