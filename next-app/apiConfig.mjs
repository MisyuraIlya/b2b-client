//const localEndpoint = 'http://host.docker.internal'
const localEndpoint = 'http://localhost'
const docker = false
const API_ENDPOINTS = {
  MEDIA: {
    local: `${localEndpoint}:8013/media/:slug*`,
    public: docker ? `${localEndpoint}:8013/media/:slug*` : 'http://b2b-client-backend-api-platform/media/:slug*'
  },
  CLIENT_MANAGER_API: {
    local: `${localEndpoint}:8010/client-manager-api/v1/:slug*`,
    public: docker ? `${localEndpoint}:8010/client-manager-api/v1/:slug*` : 'http://client-manager-api-platform/client-manager-api/v1/:slug*'
  },
  TRANSLATE_APP_API: {
    local: `${localEndpoint}:8012/translate-api/v1/:slug*`,
    public: docker ? `${localEndpoint}:8012/translate-api/v1/:slug*` : 'http://translate-app-api-platform/translate-api/v1/:slug*'
  },
  COLOR_APP_API: {
    local: `${localEndpoint}/color-api/v1/:slug*`,
    public: docker ? `${localEndpoint}/color-api/v1/:slug*` : 'http://color-app-api-platform/color-api/v1/:slug*'
  },
  CLIENT_APP_API: {
    local: `${localEndpoint}:8013/:slug*`,
    public: docker ? `${localEndpoint}:8013/:slug*` : 'http://b2b-client-backend-api-platform/:slug*'
  }
}
export default API_ENDPOINTS;