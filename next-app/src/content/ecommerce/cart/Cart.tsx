"use client"

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react"
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useCartStore } from "@/context/CartContext/CartContext";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import { UpdateProduct } from "@/types/store/cart";
import { FullCart, FullProductCart } from "./types";
import { styles } from './Cart.styles';

import CartSummary from "./blocks/CartSummary";
import CartTable from "./blocks/CartTable";
import EditProductCartDialog from "./blocks/CartTable/EditProductCartDialog";
import CartSkeleton from "./CartSeleton";

const Cart: FC = () => {
  const { data: session } = useSession();
  const t = useTranslations();
  const { updateProductInCart, deleteProductFromCart, cart: globalCart } = useCartStore();
  const [editableProductCart, setEditableProductCart] = useState<FullProductCart | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { data: cart, mutate, isLoading } = useApi<FullCart | null>({
    entrypoint: urls.customer.cartPage,
    token: session?.token,
    skip: !session || !globalCart?.productCarts.length
  });
  const handleUpdateProduct = async (product: UpdateProduct) => {
    try {
      await updateProductInCart(product);
      setIsEditOpen(false);
      mutate();
    } catch (e) { }
  }
  const handleDeleteProduct = async (productCartId: number) => {
    try {
      await deleteProductFromCart(productCartId);
      mutate()
    } catch (e) { }
  }
  useEffect(() => () => {
    mutate(undefined, true)
  }, [mutate])
  return <Box sx={styles.content}>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={9}>
        <Box sx={styles.notification}>
          <NotificationsActiveOutlined />
          <Typography variant="body2">
            Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue
          </Typography>
        </Box>
        <Typography variant="h5">
          {t('SHOP_PAGE_TITLE_MY_CART')}
        </Typography>
        {isLoading ? <CartSkeleton /> : (
          <CartTable
            data={cart?.productCarts ?? []}
            handleUpdateProduct={(productCart) => {
              setEditableProductCart(productCart);
              setIsEditOpen(true);
            }}
            deleteProduct={handleDeleteProduct} />
        )}
      </Grid>
      <Grid item xs={12} lg={3}>
        {cart?.productCarts.length ? (
          <CartSummary cart={cart} />
        ) : null}
      </Grid>
    </Grid>
    <EditProductCartDialog
      open={isEditOpen}
      handleClose={() => { setIsEditOpen(false) }}
      productCart={editableProductCart}
      handleSave={handleUpdateProduct}
    />
  </Box>
}

export default Cart;