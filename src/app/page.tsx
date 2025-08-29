import Image from "next/image";
import heroImg from '@/assets/hero.svg'
export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-medium mb-2">Gerencie sua empresa</h2>
      <h1 className="text-3xl font-bold mb-8 text-blue-600 md:text-4xl">Atendimentos, Clientes</h1>
      <Image
        src={heroImg}
        alt="Imagem hero do Dev Controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
