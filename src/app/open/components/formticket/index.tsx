"use client"

import { FormInput } from "@/components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CustomerDataInfo } from "../../page"
import { api } from "@/lib/api"
import { useState } from "react"
import { FiLoader } from "react-icons/fi"

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
    customer: CustomerDataInfo
}

export function FormTicket({customer}: FormTicketProps) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit,setValue, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data: FormData) {
        setLoading(true);
        const response = await api.post("/api/ticket", {
            name: data.name,
            description: data.description,
            customerId:  customer.id
        })

        setLoading(false);
        setValue("name", "");
        setValue("description", "");
    }

    return (
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded mb-8" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 text-lg font-medium">
                Nome do chamado
            </label>
            <FormInput 
                type="text"
                name="name"
                placeholder="Digite o Nome do chamado"
                register={register}
                error={errors.name?.message}
            />
            <label className="mt-2 text-lg font-medium">
               Descreva o problema
            </label>
            <textarea 
            className="w-full bg-amber-50 rounded-md h-24 resize-none mb-2 px-2"
            placeholder="Digite a descrição do problema"
            id="description"
            {...register("description")}
            ></textarea>
            {errors.description && <p className="text-red-500 my-1">{errors.description.message}</p>}
            <button 
            className="bg-blue-500 flex flex-row w-full gap-3 px-2 h-11 items-center justify-center rounded text-white font-bold cursor-pointer hover:bg-blue-900 duration-300" 
            type="submit"
            >
                {loading ? (
                    <FiLoader className="animate-spin" size={20} />
                ) : (
                    "Cadastrar"
                )}
            </button>
        </form>
    )
}