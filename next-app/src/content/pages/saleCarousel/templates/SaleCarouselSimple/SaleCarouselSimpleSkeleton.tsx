"use client"
import { FC } from "react"
import { Box, Grid, Skeleton } from "@mui/material"
import { MuiStyles } from "@/types/mui"

const styles: MuiStyles = {
  grid: {
    pt: 1,
    justifyContent: 'space-around',
    height: 525,
    overflow: 'hidden'
  },
  skeletonProduct: {
    height: 525,
    transform: 'none',
    borderRadius: (theme) => theme.shape.borderRadius / 3,
  },
  gridItem: {
    maxWidth: 312,
    width: '100%'
  }
}

const SaleCarouselSimpleSkeleton: FC<{ count: number, gap: number }> = ({ count, gap }) => {
  const arr = new Array(count).fill(null).map((el, index) => index);
  return (
    <Box>
      <Grid container item gap={`${gap}px`} sx={styles.grid}>
        {arr.map((el) => (
          <Grid
            sx={styles.gridItem}
            item
            key={el}
          >
            <Skeleton animation="wave" sx={styles.skeletonProduct} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SaleCarouselSimpleSkeleton;