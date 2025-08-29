"use client";

import { CustomerTypeProps } from "@/utils/customer.type";
import { TicketTypeProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import toast from "react-hot-toast";

interface TicketItemProps {
  ticket: TicketTypeProps;
  customer: CustomerTypeProps | null;
}
export function TicketItem({ customer, ticket }: TicketItemProps) {
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  const router = useRouter();
  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      toast.success("Chamado FECHADO com sucesso!");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-BR")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <div className="flex items-center gap-4">
           
            <div className="relative group">
              <button
                className="cursor-pointer hover:scale-110 transition"
                onClick={handleChangeStatus}
              >
                <FiCheckSquare size={24} color="#908a8a" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                Fechar chamado
              </span>
            </div>

            <div className="relative group">
              <button
                className="cursor-pointer hover:scale-110 transition"
                onClick={handleOpenModal}
              >
                <FiFile size={24} color="#3d82f6" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                Abrir detalhes
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
