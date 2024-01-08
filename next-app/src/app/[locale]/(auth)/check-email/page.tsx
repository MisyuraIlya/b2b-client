import Content from '@/content';
import { AuthProvider } from '@/content/auth/context';
import clientManager from '@/provider/api/clientManager';
import urls from '@/provider/api/urls';

export default async function CheckEmailPage() {
  const pageData = await clientManager.getPage(urls.pages.checkEmail)
  return <AuthProvider form={'CheckEmailForm'}>
    <Content data={pageData} />
  </AuthProvider>
}