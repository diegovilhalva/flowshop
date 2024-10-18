import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições para utilização dos nossos serviços",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="mx-auto text-center">
        <h2 className="py-5 text-3xl">ATENDIMENTO AO CLIENTE</h2>
        <p>
          Agradecemos por escolher o Flow Shop! Nossa equipe está sempre pronta para ajudar com qualquer dúvida ou preocupação que você tenha. Para suporte, entre em contato através do e-mail atendimento@flowshop.com ou pelo telefone (11) 1234-5678. Estamos aqui para garantir que sua experiência de compra seja a melhor possível.
        </p>
        <p>
          Se você tiver problemas com um pedido ou um produto, por favor, informe-nos dentro de 7 dias após o recebimento. Faremos o possível para resolver qualquer situação e garantir a sua satisfação.
        </p>
        <h2 className="mt-10 py-5 text-3xl">PRIVACIDADE E SEGURANÇA</h2>
        <p>
          No Flow Shop, a sua privacidade é nossa prioridade. Coletamos informações pessoais somente para processar seus pedidos e melhorar sua experiência de compra. Nunca compartilharemos seus dados com terceiros sem seu consentimento prévio. Para mais informações, consulte nossa Política de Privacidade.
        </p>
        <p>
          Utilizamos medidas de segurança avançadas para proteger suas informações, incluindo criptografia e monitoramento de atividades suspeitas. Sua segurança é fundamental para nós.
        </p>
        <h2 className="mt-10 py-5 text-3xl">INQUIRIÇÕES POR ATACADO</h2>
        <p>
          Se você está interessado em comprar em grande quantidade, entre em contato conosco para discutir opções de atacado. Oferecemos preços especiais e condições de pagamento flexíveis para revendedores e lojistas. Para consultas, envie um e-mail para atacado@flowshop.com.
        </p>
        <p>
          Nossa equipe de vendas está pronta para ajudar com qualquer dúvida sobre os produtos disponíveis e condições de compra. Entre em contato e descubra como podemos trabalhar juntos!
        </p>
        <h2 className="mt-10 py-5 text-3xl">FORMAS DE PAGAMENTO</h2>
        <p>
          - Cartões de Crédito / Débito
          <br /> - PIX
          <br /> - Boleto
        </p>
      </div>
    </main>
  );
}
