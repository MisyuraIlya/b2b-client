import { PageProvider } from "@/context/PageContext/PageContext";
import { clientManager } from "@/provider/api";
import urls from "@/provider/api/urls";
import { IChildren } from "@/types/layout";

export default async function ProductLayout({ children }: IChildren) {
  const page = await clientManager.getPage(urls.pages.product);
  return (
    <PageProvider page={page}>
      <section>
        {children}
      </section>
    </PageProvider>
  )
}