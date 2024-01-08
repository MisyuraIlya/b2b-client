'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ArrowForward } from '@mui/icons-material'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStore } from "@/context/StoreContext";
import getMuiProps from "@/utils/getMuiProps";
import { CarouselProps } from "./types";
import { styles } from "./Carousel.styles";
import "swiper/css/navigation";

const Carousel = <T,>({ slidesPerView, spaceBetweenSlides, mui, data, renderItem, title, action, isLoading, loadingComponent }: CarouselProps<T>) => {
  const { direction } = useStore()
  const swiperRef = useRef<SwiperRef>(null);
  const [displayPrev, setDisplayPrev] = useState(false)
  const [displayNext, setDisplayNext] = useState(true)

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (data.length <= slidesPerView) {
      setDisplayNext(false);
      setDisplayPrev(false);
    } else {
      setDisplayNext(true);
    }
  }, [data, slidesPerView])
  const muiProps = getMuiProps(mui)

  return (
    <>
      <Box
        {...muiProps}
        sx={[styles.container, muiProps?.sx ?? null]}
      >
        <Box sx={styles.header}>
          <Typography variant='h4' sx={styles.title}>{title}</Typography>
          {action}
          {!isLoading && (displayNext || displayPrev) && (
            <Box sx={styles.navigation}>
              <ArrowForward sx={[styles.arrow, !displayPrev ? styles.hideArrow : null, direction === 'ltr' ? styles.rtlIcon : null]} onClick={handlePrev} />
              <ArrowForward sx={[styles.arrow, !displayNext ? styles.hideArrow : null, direction === 'rtl' ? styles.rtlIcon : null]} onClick={handleNext} />
            </Box>
          )}
        </Box>
        {isLoading ? loadingComponent : (
          <Swiper
            dir={direction}
            ref={swiperRef}
            slidesPerView={slidesPerView ?? 'auto'}
            spaceBetween={spaceBetweenSlides ?? 0}
            slidesPerGroup={slidesPerView ?? 1}
            modules={[Navigation]}
            onSwiper={(swiper) => {
              setDisplayNext(!swiper.isEnd);
              setDisplayPrev(!swiper.isBeginning);
            }}
            onSlideChange={(swiper) => {
              setDisplayNext(!swiper.isEnd);
              setDisplayPrev(!swiper.isBeginning);
            }}
            focusableElements=".MuiSelect-select"
          >
            {data.map((content, index) => {
              return (
                <SwiperSlide key={index}>
                  {renderItem(content)}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>
    </>


  )
}

export default Carousel;