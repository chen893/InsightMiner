'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const navigation = [
  { name: '首页', href: '/' },
  { name: '需求分析', href: '/analysis' },
  { name: '历史记录', href: '/history' },
  { name: '帮助', href: '/help' },
  { name: '关于', href: '/about' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <nav className="fixed z-10 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <i className="fas fa-lightbulb mr-3 text-2xl text-primary" />
              <span className="text-xl font-semibold text-primary">
                InsightMiner
              </span>
            </Link>
          </div>

          {/* 桌面端导航 */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'font-medium text-primary'
                    : 'text-text-medium hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 移动端导航 */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-6 flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        pathname === item.href
                          ? 'font-medium text-primary'
                          : 'text-text-medium hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
