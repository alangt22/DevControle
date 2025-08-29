import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if(!customerEmail || customerEmail === ""){
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail ,
      },
    })

    return NextResponse.json(customer);
    
  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }

  return NextResponse.json({ message: "RECEBido"});
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ error: "Field delete customer" }, { status: 400 });
  }

  // Busca todos os tickets do cliente que NÃO estão fechados
  const openTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
      NOT: {
        status: "FECHADO",
      },
    },
  });

  if (openTickets) {
    return NextResponse.json(
      { error: "Cliente possui chamados abertos e não pode ser deletado." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });
    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar cliente" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });
    return NextResponse.json({ message: "Cliente criado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new customer" },
      { status: 400 }
    );
  }
}
