import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  return (
    <nav className={cn(`relative hidden h-screen  pt-16 lg:block w-72`)}>
      <div className='flex h-screen items-center '>
        <div className=' py-2 pb-80'>
          <DashboardNav items={navItems} />
        </div>
      </div>
    </nav>
  );
}
