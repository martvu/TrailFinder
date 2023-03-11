import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative bg-inherit">
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
