"use client";

import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DirectionEnum } from "@/config/direction";
import { Direction } from '@/types/config';

interface IEmotionPops {
  dir: Direction,
  children: ReactNode
}

export default function RootStyleRegistry({ children, dir = DirectionEnum.rtl }: IEmotionPops) {
  const [cache] = useState(() => {
    const optionsRtl = {
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    }
    const optionsLtr = { key: "css" }
    const options = DirectionEnum.rtl === dir ? optionsRtl : optionsLtr
    const cache = createCache({ ...options });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}