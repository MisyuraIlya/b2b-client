import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  gridItem: {
    // gap: 3,
  },
  container: {

  },
  paginationMedium: {
    justifyContent: 'center',
    minWidth: '100%',
    flexWrap: 'wrap',
    // position: 'absolute',
    left: 0,
    '& .MuiTypography-root': {
      width: '100%',
      textAlign: 'center',
      mt: 1,
      order: 1
    }
  },
  paginationSmall: {
    justifyContent: 'center',
    minWidth: '100%',
    flexWrap: 'wrap',
  // position: 'absolute',
    left: 0,
    '& .MuiPagination-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    '& > div': {
      order: 2,
      mt: 1
    },
    '& .MuiTypography-root': {
      // width: '100%',
      textAlign: 'center',
      mt: 1,
      order: 1
    }
  }
}