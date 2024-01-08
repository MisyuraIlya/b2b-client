import Content from '@/content';
import { AuthProvider } from '@/content/auth/context';
import clientManager from '@/provider/api/clientManager';
import urls from '@/provider/api/urls';

export default async function ForgotPasswordPage() {
  const pageData = await clientManager.getPage(urls.pages.forgotPassword)
  return <AuthProvider form="ForgotPasswordForm">
    <Content data={pageData} />
  </AuthProvider>
}