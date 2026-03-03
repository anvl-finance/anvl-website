import { cookies } from 'next/headers';
import DocumentsAuth from '@/components/custom/DocumentsAuth';

export const metadata = {
  title: 'Documents | ANVL Finance',
  description: 'ANVL Finance technical documentation and white papers.',
};

export default async function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('anvl_docs_access')?.value === 'granted';

  if (!hasAccess) {
    return <DocumentsAuth>{children}</DocumentsAuth>;
  }

  return <>{children}</>;
}
