import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { ButtonVoltar } from "./components/buttonvoltar";
import { ButtonCadastrar } from "./components/buttoncadastrar";
export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <ButtonVoltar />
          <h1 className="text-3xl font-bold">novo chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
            className="w-full border-2 rounded-md h-11 px-2 mb-2"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            placeholder="Descreva o problema"
            required
            name="description"
            className="w-full border-2 rounded-md h-24 px-2 mb-2 resize-none"
          ></textarea>
          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione um cliente
              </label>
              <select
                className="w-full border-2 rounded-md h-11 bg-white px-2 mb-2 resize-none"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Ainda não possui clientes cadastrados,{" "}
              <span className="text-blue-500 font-medium hover:underline">
                Cadastrar Cliente
              </span>
            </Link>
          )}
          <ButtonCadastrar />
        </form>
      </main>
    </Container>
  );
}
