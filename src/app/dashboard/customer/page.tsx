import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma";
import { ButtonNewCustomer } from "./components/buttonnewcustomer";
import { getServerSession } from "next-auth";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany(
    {where: {
      userId: session.user.id
    }}
  );

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <ButtonNewCustomer />
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer}/>
          ))}
        </section>
        {customers.length === 0 && <p className="text-center text-gray-600 mt-4">Nenhum cliente cadastrado</p>}
      </main>
    </Container>
  );
}
