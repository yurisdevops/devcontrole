"use client";

import { useModalContext } from "@/providers/modal";
import { useRef, MouseEvent } from "react";

export function ModalTicket() {
  const { toggleVisibility, ticket } = useModalContext();
  const modalRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: MouseEvent<HTMLDivElement>) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleVisibility();
    }
  }

  return (
    <section
      onClick={handleClickOutside}
      className="absolute bg-gray-900/80 w-full min-h-screen"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado
            </h1>
            <button
              onClick={toggleVisibility}
              className="bg-red-700 p-1 px-2 rounded text-white"
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-wrap mb-2 gap-1 ">
            <h2 className="font-bold">Nome: </h2>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-wrap flex-col mb-2 gap-1 ">
            <h2 className="font-bold">Descrição: </h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b-[1.5px] my-4 "></div>

          <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

          <div className="flex flex-wrap mb-2 gap-1 ">
            <h2 className="font-bold">Nome do cliente: </h2>
            <p>{ticket?.customer?.name}</p>
          </div>

          <div className="flex flex-wrap mb-2 gap-1 ">
            <h2 className="font-bold">Email: </h2>
            <p>{ticket?.customer?.email}</p>
          </div>

          <div className="flex flex-wrap mb-2 gap-1 ">
            <h2 className="font-bold">Telefone: </h2>
            <p>{ticket?.customer?.phone}</p>
          </div>

          {ticket?.customer?.address ? (
            <div className="flex flex-wrap mb-2 gap-1 ">
              <h2 className="font-bold">Endereço: </h2>
              <p>{ticket?.customer?.address}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
