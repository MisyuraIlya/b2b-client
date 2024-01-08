import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  actionTop: {
    width: "100%",
    marginTop: 2,
  },
  actionBottom: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  actionCenter: {
    textAlign: "center",
  },
  actionLeft: {
    textAlign: "left",
  },
  actionRight: {
    textAlign: "right",
  },
  title: {
    textAlign: "center",
    maxWidth: 800,
  },
  subTitle: {
    textAlign: "center",
    marginTop: 1.5,
  },
  text: {
    position: "absolute",
    left: 64,
    right: 64,
    top: 40,
    bottom: 0,
  },
  textLeft: {
    textAlign: "left",
    mr: "auto",
  },
  textRight: {
    textAlign: "right",
    ml: "auto",
  },
  textCenter: {
    textAlign: "center",
    mx: "auto",
  },
  opacityBackground: {
    background: "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.2) 100%);",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  navigateIcon: {
    position: "absolute",
    cursor: "pointer",
    zIndex: 1,
    top: "calc(50% - 12px)",
  },
  iconNext: {
    right: "32px",
  },
  iconPrev: {
    left: "32px",
  },
  slide: {
    borderRadius: (theme) => theme.shape.borderRadius / 2,
    overflow: 'hidden',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%'
    },
    '& .swiper': {
      height: '100%',
      width: '100%'
    },
    '& .swiper-pagination-bullet': {
      background: (theme) => theme.palette.common.white,
      width: '12px',
      height:'4px',
      opacity: 0.5,
      borderRadius: '10px',
      '&.swiper-pagination-bullet-active': {
        width: '24px',
        height: '4px',
        opacity: 1
      }
    }
  },
  rtlIcon: {
    transform: 'rotate(180deg)'
  }
}