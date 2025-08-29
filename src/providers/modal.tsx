"use client";
import { createContext, ReactNode, useState } from "react";
import { TicketTypeProps } from "@/utils/ticket.type";
import { CustomerTypeProps } from "@/utils/customer.type";
import { ModalTicket } from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketTypeProps;
  customer: CustomerTypeProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailTicket(detail: TicketInfo) {
    setTicket(detail);
  }

  return (
    <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailTicket }}>
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
