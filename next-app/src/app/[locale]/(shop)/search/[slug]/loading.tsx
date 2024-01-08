"use client"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import Container from "@/components/Container"
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
  },
  headerSkeleton: {
    transform: 'none',
    height: 200,
    width: '100%',
    mb: 3,
    mt: 2
  }
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const CatalogSkeleton = () => {
  return (
    <Container>
      <Skeleton animation="wave" sx={styles.headerSkeleton} />
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
    </Container>

  )
}

export default CatalogSkeleton;