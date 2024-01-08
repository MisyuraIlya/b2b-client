"use client"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import { ArrowForward } from '@mui/icons-material';
import { Box } from '@mui/material';
import NextImage from '@/components/NextImage';
import { useStore } from '@/context/StoreContext';
import { GalleryProps } from './types';
import { NavigationOptions } from "swiper/types"
import { styles } from './Gallery.styles';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Gallery: FC<GalleryProps> = ({ images }) => {
  const { direction } = useStore();
  const swiperRef = useRef<SwiperRef>(null);
  useMemo(() => {
    images.sort((a, b) => a.position - b.position);
  }, [images])
  const initialSlide = images.find((image) => image?.defaultImage)?.position ?? 0;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(false);
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
  return (
    <Box sx={styles.container}>
      <Swiper
        ref={swiperRef}
        dir={direction}
        defaultValue={2}
        spaceBetween={10}
        initialSlide={initialSlide}
        navigation={navigation}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="gallery"
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
      >
        {images.length > 1 ? (
          <>
            <ArrowForward
              sx={[styles.navigateIcon, styles.iconPrev, direction === 'ltr' ? styles.rtlIcon : null, isBeginning ? styles.iconDisabled : null]}
              onClick={handlePrev} />
            <ArrowForward
              sx={[styles.navigateIcon, styles.iconNext, direction === 'rtl' ? styles.rtlIcon : null, isEnd ? styles.iconDisabled : null]}
              onClick={handleNext}
            />
          </>
        ) : null}
        {images.length ? images.map((image) => (
          <SwiperSlide key={image?.id}>
            <NextImage src={image.originPath} />
          </SwiperSlide>
        )) : (
          <SwiperSlide>
              <NextImage />
          </SwiperSlide>
        )}
      </Swiper>
      {images.length > 1 ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={5}
          modules={[Navigation, Thumbs]}
          className="gallery-preview"
        >
          {images.map((image) => (
            <SwiperSlide key={image?.id}>
              <Box sx={styles.slidePreview}>
                <NextImage src={image.thumbnailMediumPath} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}

    </Box>
  );
}

export default Gallery;