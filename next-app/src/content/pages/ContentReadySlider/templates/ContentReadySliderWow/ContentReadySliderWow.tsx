"use client"

import dynamic from "next/dynamic"
import { useLocale } from "next-intl"
import { FC, useCallback, useRef } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { ArrowForwardIos } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import Action from "@/components/Actions/Actions";
import { useStore } from "@/context/StoreContext"
import DigitradeManagerService from "@/provider/digitradeManager"
import getMuiProps from "@/utils/getMuiProps"
import { GridButtonHorizontalPosition, GridButtonVerticalPosition, GridTitleSubtitlePosition } from "@/types/layout"
import { ContentReadySliderProps } from "../../types"
import { NavigationOptions, PaginationOptions } from "swiper/types"
import { styles } from './ContentReadySliderWow.styles';
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css"

const DynamicImage = dynamic(() => import("@/components/DynamicImage"))
const ContentReadySlider: FC<ContentReadySliderProps> = (data) => {
  const { direction } = useStore();
  const locale = useLocale()
  const swiperRef = useRef<SwiperRef>(null)

  const gridButtonHorizontalPosition = DigitradeManagerService.getEnumValue({
    component: data,
    enumName: "gridButtonHorizontalPosition",
  }) as GridButtonHorizontalPosition

  const gridButtonVerticalPosition = DigitradeManagerService.getEnumValue({
    component: data,
    enumName: "gridButtonVerticalPosition",
  }) as GridButtonVerticalPosition

  const gridTitleSubtitlePosition = DigitradeManagerService.getEnumValue({
    component: data,
    enumName: "gridTitleSubtitlePosition",
  }) as GridTitleSubtitlePosition

  const getActionStyle = () => {
    let defaultActionPosition =
      gridButtonVerticalPosition === "top"
        ? styles.actionTop
        : styles.actionBottom
    switch (gridButtonHorizontalPosition) {
      case "left":
        return [defaultActionPosition, styles.actionLeft]
      case "right":
        return [defaultActionPosition, styles.actionRight]
      case "center":
        return [defaultActionPosition, styles.actionCenter]
      default:
        break
    }
    return [defaultActionPosition]
  }

  const getTitleSubtitleStyle = () => {
    switch (gridTitleSubtitlePosition) {
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

  const pagination: PaginationOptions = {
    clickable: true,
    type: "bullets",
    renderBullet: function (i, className) {
      return `<div class="${className}"></div>`
    },
  }
  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slideNext()
  }, [])

  const navigation: NavigationOptions = {
    enabled: true,
    nextEl: null,
    prevEl: null,
  }

  const muiProps = getMuiProps(data.mui);
  return (
    <Box {...muiProps} sx={[muiProps.sx || {}, styles.slide]}>
      <Swiper
        ref={swiperRef}
        dir={direction}
        slidesPerView={1}
        loop={true}
        pagination={pagination}
        navigation={navigation}
        modules={[Navigation, Pagination]}
      >
        <ArrowForwardIos sx={[styles.navigateIcon, styles.iconPrev, direction === 'ltr' ? styles.rtlIcon : {}]} onClick={handlePrev} />
        <ArrowForwardIos sx={[styles.navigateIcon, styles.iconNext, direction === 'rtl' ? styles.rtlIcon : {}]} onClick={handleNext} />
        {data.contentReadies.map((content) => {
          const hasTitle = !!content.title[0]
          const hasSubTitle = !!content.subTitle[0]
          const hasAction = !!content.actionType
          return (
            <SwiperSlide key={content.id}>
              <Box sx={styles.opacityBackground} />
              {hasTitle || hasSubTitle || hasAction ? (
                <Box sx={styles.text}>
                  {hasTitle && (
                    <Typography
                      sx={[styles.title, getTitleSubtitleStyle()]}
                      variant="h3"
                    >
                      {content.title[0][locale]}
                    </Typography>
                  )}
                  {hasSubTitle && (
                    <Typography
                      sx={[styles.subTitle, getTitleSubtitleStyle()]}
                      variant="subtitle1"
                    >
                      {content.subTitle[0][locale]}
                    </Typography>
                  )}
                  {hasAction && (
                    <Box sx={getActionStyle()}>
                      <Action actionName={content.actionName} actionSource={content.actionSource} actionType={content.actionType} />
                    </Box>
                  )}
                </Box>
              ) : null}
              <DynamicImage media={content.media} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}

export default ContentReadySlider
