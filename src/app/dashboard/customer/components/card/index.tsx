'use client';

import { CustomerTypeProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export function CardCustomer({ customer }: { customer: CustomerTypeProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDeleteCustomer() {
    setLoading(true);
    try {
      await api.delete("/api/customer", {
        params: { id: customer.id },
      });

      setLoading(false);
      toast.success("Cliente deletado com sucesso!");
      router.refresh();
    } catch (error: any) {
      console.log("Erro ao deletar cliente:", error);

      const msg =
        error.response?.data?.error ||
        "Erro ao deletar cliente. Tente novamente.";

      setLoading(false);

      toast.error(msg);
    }
  }

  return (
    <article className="flex flex-col bg-gray-300 border-2 p-2 rounded-lg gap-2 hover:scale-101 duration-300 last:mb-10">
      <h2>
        <span className="font-bold">Nome:</span> {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email:</span> {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone:</span> {customer.phone}
      </p>
      <button
        onClick={handleDeleteCustomer}
        className="bg-red-500 px-4 rounded text-white mt-2 self-start cursor-pointer hover:bg-red-900 duration-300"
      >
        {loading ? (
          <FiLoader className="animate-spin" size={20} />
        ) : (
          "Deletar"
        )}
      </button>
    </article>
  );
}
