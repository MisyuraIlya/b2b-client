"use client"

import dynamic from "next/dynamic"
import { useLocale } from "next-intl"
import { FC } from "react"
import { Box, Typography } from "@mui/material"
import Action from "@/components/Actions";
import { GridItemProps } from "./types"
import { styles } from "./GridItem.styles"

const DynamicImage = dynamic(() => import("@/components/DynamicImage"))

const GridItem: FC<GridItemProps> = (props) => {
  const locale = useLocale()
  const hasDescription = !!props.description[0]
  const hasTitle = !!props.title[0]
  const hasSubTitle = !!props.subTitle[0]
  const hasAction = !!props.actionType
  const displayOpacityBackground = hasTitle || hasSubTitle

  const getActionStyle = () => {
    const defaultPosition =
      props.gridButtonVerticalPosition === "top"
        ? styles.actionTop
        : styles.actionBottom
    switch (props.gridButtonHorizontalPosition) {
      case "left":
        return [defaultPosition, styles.actionLeft]
      case "right":
       return [defaultPosition, styles.actionRight]
      case "center":
        return [defaultPosition, styles.actionCenter]
      default:
        break
    }
    return [defaultPosition]
  }

  const getTitleSubtitleStyle = () => {
    switch (props.gridTitleSubtitlePosition) {
      case "center":
        return styles.textCenter
      case "left":
        return styles.textLeft
      case "right":
        return styles.textRight
      default:
        return {}
    }
  }

  return (
    <Box sx={styles.item}>
      {displayOpacityBackground && <Box sx={styles.opacityBackground} />}
      {props.media && <DynamicImage media={props.media} />}

      {hasDescription ? (
        <>
          <Box sx={styles.descriptionContainer}>
            {hasDescription && (
              <Typography
                component="div"
                sx={styles.description}
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: props.description[0][locale],
                }}
              />
            )}
            {props.actionType && (
              <Box sx={styles.actionTop}>
                <Action actionName={props.actionName} actionSource={props.actionSource} actionType={props.actionType} />
              </Box>
            )}
          </Box>
        </>
      ) : hasTitle || hasSubTitle || hasAction ? (
        <>
          <Box sx={styles.text}>
            {hasTitle && (
              <Typography sx={getTitleSubtitleStyle()} variant="h4">
                {props.title[0][locale]}
              </Typography>
            )}
            {hasSubTitle && (
              <Typography
                sx={[styles.subTitle, getTitleSubtitleStyle()]}
                variant="subtitle2"
              >
                {props.subTitle[0][locale]}
              </Typography>
            )}
            {props.actionType && (
              <Box sx={getActionStyle()}>
                <Action actionName={props.actionName} actionSource={props.actionSource} actionType={props.actionType} />
              </Box>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default GridItem
