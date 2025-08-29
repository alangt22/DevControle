"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export function ButtonVoltar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-gray-900 text-white px-4 py-1 rounded flex items-center justify-center gap-2 min-w-[100px] h-9 cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <FiLoader className="animate-spin" size={20} />
      ) : (
        "Voltar"
      )}
    </button>
  );
}
