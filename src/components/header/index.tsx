"use client";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { signOut, useSession, signIn } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} className="hover:scale-110 duration-300 cursor-pointer">
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard" className="hover:scale-110 duration-300">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout} className="hover:scale-110 duration-300 cursor-pointer">
              <FiLogOut size={26} color="#d64d4d" />
              
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
