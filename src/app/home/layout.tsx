import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dora',
  description: 'A News Api Collector',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className='flex h-screen overflow-hidden'>
        {/* <Sidebar /> */}
        <main className='w-full pt-4'>{children}</main>
      </div>
    </>
  );
}
