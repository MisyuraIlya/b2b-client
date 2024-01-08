import Content from '@/content';
import { AuthProvider } from '@/content/auth/context';
import clientManager from '@/provider/api/clientManager';
import urls from '@/provider/api/urls';

export default async function LoginPage() {
  const pageData = await clientManager.getPage(urls.pages.login)
  return <AuthProvider form={'LoginForm'}>
    <Content data={pageData} />
  </AuthProvider>
}