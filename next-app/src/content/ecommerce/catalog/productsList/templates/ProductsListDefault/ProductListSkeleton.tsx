"use client"
import { FC } from "react"
import Grid, { GridSize } from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import { MuiStyles } from "@/types/mui"

const styles: MuiStyles = {
  grid: { pt: 1 },
  skeletonProduct: {
    height: 525,
    transform: 'none',
    width: '100%',
    borderRadius: (theme) => theme.shape.borderRadius / 3,
  },
  gridItem: {
    maxWidth: 312,
    minWidth: 270,
    width: '100%'
  }
}

const ProductListSkeleton: FC<{ count: number, gridSize?: GridSize }> = ({ count, gridSize }) => {
  const arr = new Array(count).fill(null).map((el, index) => index);
  return (
    <Grid container item spacing={3} sx={styles.grid}>
      {arr.map((el) => (
        <Grid
          sx={styles.gridItem}
          item
          md={gridSize}
          key={el}
        >
          <Skeleton animation="wave" sx={styles.skeletonProduct} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductListSkeleton;