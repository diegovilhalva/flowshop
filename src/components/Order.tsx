import { SUPPORT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { orders } from "@wix/ecom";
import { format} from "date-fns";
import Link from "next/link";
import Badge from "./ui/badge";
import WixImage from "./WixImage";

interface OrderProps {
  order: orders.Order;
}

export default function Order({ order }: OrderProps) {
  const paymentStatusMap: Record<orders.PaymentStatus, string> = {
    [orders.PaymentStatus.PAID]: "Pago",
    [orders.PaymentStatus.NOT_PAID]: "Não pago",
    [orders.PaymentStatus.FULLY_REFUNDED]: "Reembolsado",
    [orders.PaymentStatus.PARTIALLY_PAID]: "Parcialmente pago",
    [orders.PaymentStatus.PARTIALLY_REFUNDED]: "Parcialmente reembolsado",
    [orders.PaymentStatus.PENDING]: "Pendente",
    [orders.PaymentStatus.UNSPECIFIED]: "Sem informação",
  };

  const fulfillmentStatusMap: Record<orders.FulfillmentStatus, string> = {
    [orders.FulfillmentStatus.FULFILLED]: "Entregue",
    [orders.FulfillmentStatus.NOT_FULFILLED]: "Não enviado",
    [orders.FulfillmentStatus.PARTIALLY_FULFILLED]: "Parcialmente entregue",
  };

  const paymenStatus = order.paymentStatus
    ? paymentStatusMap[order.paymentStatus]
    : null;

  const fulfillmentStatus = order.fulfillmentStatus
    ? fulfillmentStatusMap[order.fulfillmentStatus]
    : null;

  const shippingDestination =
    order.shippingInfo?.logistics?.shippingDestination;

  return (
    <div className="w-full space-y-5 border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-bold">Pedido #{order.number}</span>
        {order._createdDate && (
          <span>{format(order._createdDate, "dd/MM/yyyy")}</span>
        )}
        <Link
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Pedido #${order.number} ajuda`)}&body=${encodeURIComponent(`Preciso de ajuda com o pedido #${order.number}\n\n<Descreva seu problema>`)}`}
          className="ms-auto text-sm hover:underline"
        >
          Precisa de ajuda?
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="basis-96">
          <div className="space-y-0.5">
            <div className="flex items-center gap-3 font-semibold">
              <span>
                Subtotal: {order.priceSummary?.subtotal?.formattedAmount}
              </span>
              <Badge
                className={cn(
                  "bg-secondary text-secondary-foreground",
                  order.paymentStatus === orders.PaymentStatus.NOT_PAID &&
                    "bg-red-500 text-white",
                  order.paymentStatus === orders.PaymentStatus.PAID &&
                    "bg-green-500 text-white",
                )}
              >
                {paymenStatus || "Sem informação"}
              </Badge>
            </div>
            <div className="font-semibold">
              {fulfillmentStatus || "Sem informação"}
            </div>
          </div>
          <div className="divide-y">
            {order.lineItems?.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </div>
        </div>
        {shippingDestination && (
          <div className="space-y-0.5">
            <div className="font-semibold">Endereço de entrega:</div>
            <p>
              {shippingDestination.contactDetails?.firstName}{" "}
              {shippingDestination.contactDetails?.lastName}
            </p>
            <p>
              {shippingDestination.address?.streetAddress?.name}{" "}
              {shippingDestination.address?.streetAddress?.number}
            </p>
            <p>
              {shippingDestination.address?.postalCode}{" "}
              {shippingDestination.address?.city}
            </p>
            <p>
              {shippingDestination.address?.subdivision ||
                shippingDestination.address?.country}
            </p>
            <p className="font-semibold">{order.shippingInfo?.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderItemProps {
  item: orders.OrderLineItem;
}

function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex flex-wrap gap-3 py-5 last:pb-0">
      <WixImage
        mediaIdentifier={item.image}
        width={110}
        height={110}
        alt={item.productName?.translated || "Imagem do produto"}
        className="flex-none bg-secondary"
      />
      <div className="space-y-0.5">
        <p className="line-clamp-1 font-bold">{item.productName?.translated}</p>
        <p>
          {item.quantity} x {item.price?.formattedAmount}
        </p>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
