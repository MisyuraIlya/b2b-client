"use client"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import { MuiStyles } from "@/types/mui"

const styles: MuiStyles = {
  grid: { pt: 1 },
  skeletonProduct: {
    height: 574,
    transform: 'none',
    width: '100%',
    maxWidth: 312,
    minWidth: 270,
    borderRadius: (theme) => theme.shape.borderRadius / 3,
  },
  gridItem: {
    maxWidth: 312,
    width: (theme) => `calc(50% - ${theme.spacing(1.5)})`
  }
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const CatalogSkeleton = () => {
  return (
    <Grid container item gap={3} sx={styles.grid}>
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
  )
}

export default CatalogSkeleton;