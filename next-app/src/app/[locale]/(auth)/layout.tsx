import { getServerSession } from "next-auth";
import { redirect } from "next-intl/server";
import { authOptions } from "@/lib/auth";
import { IChildren } from "@/types/layout";

export default async function AuthLayout({ children }: IChildren) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/')
  }
  return (
    <body>
      <main>
        {children}
      </main>
    </body>
  )
}