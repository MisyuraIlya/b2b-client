"use client"

import NextLink from 'next-intl/link'
import { ComponentProps, forwardRef } from "react";

const Link = forwardRef(({ prefetch = false, ...rest }: ComponentProps<typeof NextLink>, ref: React.Ref<HTMLAnchorElement>) => {
  return <NextLink {...rest} prefetch={prefetch} as={rest.href} ref={ref} />
})

Link.displayName = 'Link'

export default Link;