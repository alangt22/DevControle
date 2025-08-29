'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLoader } from 'react-icons/fi';

export function ButtonNewTicket() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push('/dashboard/new');
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-900 duration-300 flex items-center justify-center gap-2 cursor-pointer min-w-[140px] h-[36px]"
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin" size={20} />
          <span className="sr-only">Carregando...</span>
        </>
      ) : (
        'Abrir chamado'
      )}
    </button>
  );
}
