import Content from '@/content';
import clientManager from '@/provider/api/clientManager';

export default async function IndexPage() {
  const pageData = await clientManager.getPage()
  return <Content data={pageData} />
}