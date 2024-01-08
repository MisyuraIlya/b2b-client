import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { ProductTitleProps } from "./types";
import { styles } from './ProductTitle.styles'

const ProductTitle: FC<ProductTitleProps> = ({ name }) => {
  return <Box>
    <Typography variant="subtitle1" sx={styles.title}>
      {name}
    </Typography>
  </Box>
}

export default ProductTitle;