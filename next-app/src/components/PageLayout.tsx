'use client';

import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations();
  return(
    <div>
      <h1>{t(title)}</h1>
      <h1>{t('SHOP_LABEL_ITEMS_FOUND_SINGULAR')}</h1>
      {children}
    </div>
  )
}