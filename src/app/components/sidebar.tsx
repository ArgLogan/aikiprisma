
'use client';

import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <>
      {/* Navbar en móviles (fija en la parte inferior) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 shadow-lg md:hidden">
        <ul className="flex justify-around">
          <li>
            <Link
              href="/informes/clases"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-200"
            >
              Clases
            </Link>
          </li>
          <li>
            <Link
              href="/informes/eventos"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-200"
            >
              Eventos
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar en pantallas grandes */}
      <aside className="hidden md:block w-48 bg-gray-100 p-5">
        <ul className="space-y-2">
          <li>
            <Link
              href="/informes/clases"
              className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-200"
            >
              Clases
            </Link>
          </li>
          <li>
            <Link
              href="/informes/eventos"
              className="block px-3 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-200"
            >
              Eventos
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;