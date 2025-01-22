import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Falha ao tentar atualizar o chamado." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.update({
      where: { id: id as string },
      data: {
        status: "FECHADO",
      },
    });
    return NextResponse.json({ message: "Chamado fechado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao tentar atualizar o chamado." },
      { status: 400 }
    );
  }
}
