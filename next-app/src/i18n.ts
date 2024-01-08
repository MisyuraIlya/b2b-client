import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { translation } from './provider/api';

async function getMessages(locale: string) {
  try {
    return await translation.getMessages(locale)
  } catch (error) {
    console.log(error)
    notFound();
  }
}
export default getRequestConfig(async ({ locale }) => ({
  messages: await getMessages(locale)
}));