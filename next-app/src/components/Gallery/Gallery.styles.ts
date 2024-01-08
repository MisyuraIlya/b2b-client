import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    '& .gallery': {
      maxHeight: 415,
      overflow: 'hidden',
      '& .swiper-slide': {
        height: 415
      },
      '& img': {
        width: '100%',
        maxHeight: 415,
        objectFit: 'contain'
      }
    },
    '& .gallery-preview': {
      mt: 2,
      px: '1px',
      overflow: 'hidden',
      '& .swiper-wrapper': {
        maxHeight: 80
      },
      '& .swiper-slide-thumb-active': {
        '& div': {
          borderColor: (theme) => theme.palette.primary.main
        }
      },
      '& img': {
        width: '100%',
        maxHeight: 'inherit',
        objectFit: 'contain'
      }
    }
  },
  slidePreview: {
    borderRadius: (theme) => theme.shape.borderRadius / 3,
    border: '1px solid transparent',
    overflow: 'hidden',
    maxHeight: 78,
    minHeight: 78,
    cursor: 'pointer'
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
  rtlIcon: {
    transform: 'rotate(180deg)'
  },
  iconDisabled: {
    color: (theme) => theme.palette.grey[300],
    cursor: 'auto'
  }
}