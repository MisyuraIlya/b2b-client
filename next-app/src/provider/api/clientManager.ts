import apiProvider from '@/provider/api/apiProvider';
import { InitData } from '@/types/initData';
import { IPage } from '@/types/page';

const entrypoint = process.env.NEXT_PUBLIC_CLIENT_MANAGER_ENTRYPOINT!

const clientManager = {
  getInit: async (): Promise<InitData> => {
    return await apiProvider.fetchClientData({
      entrypoint: entrypoint,
      path: '/init',
      options: { cache: 'no-store' }
    });
  },
  getPage: async (slug?: string): Promise<IPage> => {
    const path = slug ? `/page/${slug}` : '/page'
    return await apiProvider.fetchClientData({
      entrypoint: entrypoint,
      path: path,
      options: { cache: 'no-store' }
    });
  }
}
export default clientManager