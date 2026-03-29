"use client";
import './globals.css';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      const isPublicPage = pathname === '/login' || pathname === '/cadastro';
    
      if (!token && !isPublicPage) {
        router.push('/login');
      }
    }, [pathname]);
    return (
      <html lang="pt">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    );
  }
