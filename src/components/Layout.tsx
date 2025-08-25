import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 To-Do List
          </h1>
          <p className="text-gray-600">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          {children}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Desenvolvido por{' '}
            <a 
              href="https://instagram.com/paulloacg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
            >
              Paulo Gomes
            </a>
            {' '}com Next.js e TailwindCSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;