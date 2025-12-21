export interface NavigationItem {
  name: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  { name: 'Product', href: '#product' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Customers', href: '#customers' },
  { name: 'Docs', href: '#docs' },
  { name: 'Blog', href: '#blog' },
];
