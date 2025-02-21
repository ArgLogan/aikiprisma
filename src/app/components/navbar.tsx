'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false); // Cierra el menú
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              Home
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/ficha" className="hover:bg-blue-700 px-3 py-2 rounded">
              Alumnos
            </Link>
            <Link href="/clases" className="hover:bg-blue-700 px-3 py-2 rounded">
              Clases
            </Link>
            <Link href="/feriados" className="hover:bg-blue-700 px-3 py-2 rounded">
              Feriados
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-blue-700" onClick={closeMenu}>
              Home
            </Link>
            <Link href="/ficha" className="block px-3 py-2 rounded hover:bg-blue-700" onClick={closeMenu}>
              Alumnos
            </Link>
            <Link href="/clases" className="block px-3 py-2 rounded hover:bg-blue-700" onClick={closeMenu}>
              Clases
            </Link>
            <Link href="/feriados" className="block px-3 py-2 rounded hover:bg-blue-700" onClick={closeMenu}>
              Feriados
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
