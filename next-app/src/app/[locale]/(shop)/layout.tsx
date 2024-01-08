import { getServerSession } from "next-auth";
import {ReactNode} from "react";
import AppBar from '@/content/appBar';
import { CartProvider } from "@/context/CartContext/CartContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { HeaderProvider } from "@/context/HeaderContext";
import NotificationsContext from "@/context/NotificationsContext/NotificationsContext";
import { authOptions } from "@/lib/auth";
import { clientData, clientManager, customerServer } from "@/provider/api";
import urls from "@/provider/api/urls";
import {Category} from "@/types/category";
import { Cart } from "@/types/store/cart";

export default async function ShopLayout({ children }: {	children: ReactNode }) {
	const session = await getServerSession(authOptions);
	const categories = await clientData.getData<Category[]>(urls.client.categoryTree);
	const carts = session?.token ? await customerServer.fetch<Cart[]>(urls.customer.cart, {}, session?.token) : null;
	const initData = await clientManager.getInit();
	return(
		<body>
			<NotificationsContext>
				<HeaderProvider data={initData}>
					<CartProvider carts={carts}>
						<CategoriesProvider categories={categories}>
							<AppBar />
							<main>
								{children}
							</main>
						</CategoriesProvider>
					</CartProvider>
				</HeaderProvider>
			</NotificationsContext>
		</body>
	)
}