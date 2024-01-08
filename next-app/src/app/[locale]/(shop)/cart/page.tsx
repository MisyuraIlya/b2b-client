import { getServerSession } from 'next-auth';
import { redirect } from 'next-intl/server';
import Container from '@/components/Container';
const CartDetails = dynamic(() => import('@/content/ecommerce/cart'));
import dynamic from 'next/dynamic';
import { authOptions } from '@/lib/auth';

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/')
  }
  return <Container>
    <CartDetails />
  </Container>
}