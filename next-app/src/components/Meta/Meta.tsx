'use client'
import { usePathname } from 'next-intl/client'
import { FC } from 'react'

type MetaProps = {
  meta: Record<string, Record<string, string>>,
}

const Meta: FC<MetaProps> = ({ meta }) => {
  const pathname = usePathname();

  const regExp = new RegExp(`^/`);
  const key = pathname.replace(regExp, '');
  return (
    <title>
      {meta[key]?.title ?? ''}
    </title>
  )
}

export default Meta;