'use client';
import { useRouter } from 'next/navigation';
import { FiRefreshCcw } from 'react-icons/fi';
import { useState } from 'react';

export function ButtonRefresh() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);
    router.refresh();

    
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleRefresh}
      className="bg-gray-900 px-4 py-1 rounded cursor-pointer hover:bg-gray-900/50 duration-300"
    >
      <FiRefreshCcw
        size={24}
        color="#4c4e52"
        className={isSpinning ? 'animate-spin' : '' }
      />
    </button>
  );
}
