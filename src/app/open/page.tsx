"use client";
import { FormInput } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiLoader, FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/formticket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setLoading(false);
    setCustomer(null);
    setValue("email", "");
   
  }

  async function handleSearchCustomer(data: FormData) {
    setLoading(true);
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", { message: `Cliente (${data.email}) não encontrado` });
      setValue("email", "");
      setLoading(false);
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });

    
    setLoading(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-4 rounded flex items-center justify-between border-2">
            <p className="text-lg">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button
              onClick={handleClearCustomer}
              className="h-11 px-2 flex items-center justify-center rounded cursor-pointer hover:scale-120 duration-300"
            >
              <FiX size={30} color="#ff2929" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <FormInput
                name="email"
                placeholder="Digite o email do cliente..."
                type="text"
                error={errors.email?.message}
                register={register}
              />
              <button
                type="submit"
                className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center rounded text-white font-bold cursor-pointer hover:bg-blue-900 duration-300"
              >
                {loading ? (
                  <FiLoader className="animate-spin" size={20} />
                ) : (
                  <>
                    Procurar clientes
                    <FiSearch size={24} color="#fff" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
