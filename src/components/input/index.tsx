"use client"
import { UseFormRegister,  RegisterOptions } from "react-hook-form"

interface InputProps {
    type: string
    placeholder: string
    name: string
    register: UseFormRegister<any>
    error?: string
    rules?: RegisterOptions
}

export function FormInput({ name, placeholder, type, register, rules, error}: InputProps) {
    return(
        <>
            <input 
                className="w-full rounded-md h-11 px-2 bg-amber-50"
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
    )
}