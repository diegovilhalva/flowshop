import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "Descubra a Flow Shop, sua loja online de moda e acessórios. Oferecemos uma ampla seleção de roupas, calçados e acessórios para todos os estilos. Com produtos de alta qualidade e preços acessíveis, a Flow Shop é o destino certo para renovar seu guarda-roupa com as últimas tendências. Explore nossa coleção e aproveite promoções exclusivas!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={lora.className}>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
