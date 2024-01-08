import withNextIntl from 'next-intl/plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import API_ENDPOINTS from './apiConfig.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'
const { MEDIA, CLIENT_MANAGER_API, TRANSLATE_APP_API, COLOR_APP_API, CLIENT_APP_API } = API_ENDPOINTS


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXT_PUBLIC_CLIENT_MANAGER_ENTRYPOINT: '/api/manager',
    NEXT_PUBLIC_LANGUAGE_APP_ENTRYPOINT: '/api/translate',
    NEXT_PUBLIC_COLOR_APP_ENTRYPOINT: '/api/color',
    NEXT_PUBLIC_API_ENDPOINT: '/api/client',
    NEXT_PUBLIC_TEST_DOMAIN: 'digitrade.center'
  },
  async rewrites() {
    return [
      {
        source: '/media/:slug*',
        destination: isProd ? MEDIA.public : MEDIA.local
      },
      {
        source: '/api/manager/:slug*',
        destination: isProd ? CLIENT_MANAGER_API.public : CLIENT_MANAGER_API.local
      },
      {
        source: '/api/translate/:slug*',
        destination: isProd ? TRANSLATE_APP_API.public : TRANSLATE_APP_API.local
      },
      {
        source: '/api/color/:slug*',
        destination: isProd ? COLOR_APP_API.public : COLOR_APP_API.local
      },
      {
        source: '/api/client/:slug*',
        destination: isProd ? CLIENT_APP_API.public : CLIENT_APP_API.local
      },
    ]
  }
}

const nextIntlModule = withNextIntl('./src/i18n.ts')({ ...nextConfig })
export default nextIntlModule