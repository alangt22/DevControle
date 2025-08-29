'use client';

import { useFormStatus } from 'react-dom';
import { FiLoader } from 'react-icons/fi';

export function ButtonCadastrar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 px-2 cursor-pointer h-11 my-4 rounded text-white font-bold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px] hover:bg-blue-900 duration-300"
    >
      {pending ? (
        <FiLoader className="animate-spin" size={20} />
      ) : (
        'Cadastrar'
      )}
    </button>
  );
}
