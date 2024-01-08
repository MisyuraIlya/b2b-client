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
  description: {
    maxHeight: "calc(100% - 80px)",
    overflowY: "auto",
  },
  subTitle: {
    marginTop: 1,
  },
  text: {
    position: "absolute",
    top: 40,
    left: 40,
    bottom: 0,
    right: 40,
  },
  descriptionContainer: {
    width: "100%",
    height: "100%",
  },
  item: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: (theme) => theme.shape.borderRadius / 2,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  opacityBackground: {
    backgroundColor: (theme) => theme.palette.common.black,
    opacity: 0.2,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
}