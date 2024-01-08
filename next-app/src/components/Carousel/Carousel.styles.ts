import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  arrow: {
    cursor: 'pointer',
    m: 1
  },
  title: {
    marginRight: '32px',
  },
  slide: {
    display: 'flex',
    flexDirection: 'column'
  },
  hideArrow: {
    opacity: 0.5,
    cursor: 'default'
  },
  rtlIcon: {
    transform: 'rotate(180deg)'
  },
  container: {
    '& .swiper': {
      pl: 0.2,
      pr: 0.5,
      py: 0.2
    },
    '& .swiper-slide': {
      width: 'fit-content',
      height: 'auto',
      '& > div': {
        height: '100%'
      }
    }
  }
}