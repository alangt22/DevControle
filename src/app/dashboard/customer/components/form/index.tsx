"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O numero de telefone deve estar (DD) 999999999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({userId}: {userId: string}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {register,handleSubmit,formState: { errors },} = useForm<FormData>({ resolver: zodResolver(schema) });

  async function handleRegisterCustomer(data: FormData) {
    setLoading(true);
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data?.address,
      userId: userId
    });
    router.refresh();
    router.replace("/dashboard/customer");
    setLoading(false);
  }
  
  return (
    <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <FormInput
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <FormInput
            type="number"
            name="phone"
            placeholder="Exemplo (DD) 912345678"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <FormInput
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>
      <label className="mb-1 text-lg font-medium">Endereço completo</label>
      <FormInput
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        error={errors.address?.message}
        register={register}
      />
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-500 px-2 cursor-pointer h-11 my-4 rounded text-white font-bold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px] hover:bg-blue-900 duration-300"
    >
      {loading ? (
        <FiLoader className="animate-spin" size={20} />
      ) : (
        'Cadastrar'
      )}
    </button>
    </form>
  );
}
