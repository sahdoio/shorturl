import React, { ReactNode } from 'react';
import Navbar from '@/app/components/NavBar'
import Footer from '@/app/components/Footer'
import "@/app/globals.css"

type LayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar/>
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AppLayout;
