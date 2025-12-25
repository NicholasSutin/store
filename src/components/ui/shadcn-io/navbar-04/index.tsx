'use client';

import * as React from 'react';
import { useEffect, useState, useRef, useId } from 'react';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...(props as any)}
    >
      {/* Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE */}
      <path d="m21.9 7.89l-1.05-3.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 7.89c-.46 1.97.85 3.11.9 3.17V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7.94c1.12-1.12 1.09-2.41.9-3.17M13 5h1.96l.54 3.52c.09.71-.39 1.48-1.28 1.48c-.67 0-1.22-.59-1.22-1.31zM6.44 8.86c-.08.65-.6 1.14-1.21 1.14c-.93 0-1.35-.97-1.19-1.64L5.05 5h1.97zM11 8.69c0 .72-.55 1.31-1.29 1.31c-.75 0-1.3-.7-1.22-1.48L9.04 5H11zM18.77 10c-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01l1.05 3.37c.16.67-.25 1.64-1.19 1.64" />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar04NavItem {
  href?: string;
  label: string;
}

export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar04NavItem[];
  signInText?: string;
  signInHref?: string;
  cartText?: string;
  cartHref?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  onSignInClick?: () => void;
  onCartClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar04NavItem[] = [
  { href: '/products', label: 'Products' },
  { href: '/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
];

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Sign In',
      signInHref = '/signin',
      cartText = 'Cart',
      cartHref = '/cart',
      cartCount = 0,
      searchPlaceholder = 'Search...',
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement | null>(null);
    const searchId = useId();

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };

      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get('search') as string;

      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 no-underline',
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link
                            href={link.href ?? '#'}
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}

                      <NavigationMenuItem
                        className="w-full"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <div
                          role="separator"
                          aria-orientation="horizontal"
                          className="bg-border -mx-1 my-1 h-px"
                        />
                      </NavigationMenuItem>

                      {/* Mobile Sign In */}
                      <NavigationMenuItem className="w-full">
                        <Link
                          href={signInHref}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                          onClick={onSignInClick}
                        >
                          {signInText}
                        </Link>
                      </NavigationMenuItem>

                      {/* Mobile Cart */}
                      <NavigationMenuItem className="w-full">
                        <Button asChild size="sm" className="mt-0.5 w-full text-left text-sm">
                          <Link href={cartHref} onClick={onCartClick}>
                            <span className="flex items-baseline gap-2">
                              {cartText}
                              <span className="text-primary-foreground/60 text-xs">
                                {cartCount}
                              </span>
                            </span>
                          </Link>
                        </Button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Logo */}
            <Link
              href={logoHref}
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">{logo}</div>
              <span className="hidden font-bold text-xl sm:inline-block">Store</span>
            </Link>

            {/* Desktop navigation */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href ?? '#'}
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                id={searchId}
                name="search"
                className="peer h-8 ps-8 pe-2"
                placeholder={searchPlaceholder}
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </form>
          </div>

          {/* Right side */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              {/* Sign In */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <Link href={signInHref} onClick={onSignInClick}>
                  {signInText}
                </Link>
              </Button>

              {/* Cart */}
              <Button
                asChild
                size="sm"
                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm cursor-pointer"
              >
                <Link href={cartHref} onClick={onCartClick}>
                  <span className="flex items-baseline gap-2">
                    {cartText}
                    <span className="text-primary-foreground/60 text-xs">
                      {cartCount}
                    </span>
                  </span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>
    );
  }
);

Navbar04.displayName = 'Navbar04';

export { Logo, HamburgerIcon };
