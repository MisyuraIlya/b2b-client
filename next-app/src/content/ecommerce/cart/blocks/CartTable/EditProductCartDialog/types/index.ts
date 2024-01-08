import { UpdateProduct } from "@/types/store/cart";
import { FullProductCart } from "@/content/ecommerce/cart/types"

export type EditProductCartDialogProps = {
  productCart: FullProductCart | null;
  open: boolean;
  handleClose: () => void;
  handleSave: (product: UpdateProduct) => void;
}