"use client"
import { FC } from "react"
import Grid, { GridSize } from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import { MuiStyles } from "@/types/mui"

const styles: MuiStyles = {
  grid: { mt: 3 },
  skeletonProduct: {
    height: 201,
    transform: 'none',
    width: '100%',
    borderRadius: (theme) => theme.shape.borderRadius / 3,
  }
}

const BrandsListSkeleton: FC<{ count: number }> = ({ count }) => {
  const arr = new Array(count).fill(null).map((el, index) => index);
  return (
    <Grid container spacing={3} sx={styles.grid}>
      {arr.map((el) => (
        <Grid
          sx={styles.gridItem}
          item
          lg={3}
          md={4}
          xs={6}
          key={el}
        >
          <Skeleton animation="wave" sx={styles.skeletonProduct} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BrandsListSkeleton;