'use client';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-48 bg-gray-100 p-5">
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
  );
};

export default Sidebar;

