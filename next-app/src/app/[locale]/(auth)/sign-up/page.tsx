import Content from '@/content';
import { AuthProvider } from '@/content/auth/context';
import clientManager from '@/provider/api/clientManager';
import urls from '@/provider/api/urls';

export default async function SignUpPage() {
  const pageData = await clientManager.getPage(urls.pages.signUp)
  return <AuthProvider form={'SignUpForm'}>
    <Content data={pageData} />
  </AuthProvider>
}