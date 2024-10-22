import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";
import { Button, ButtonProps } from "./ui/button";

import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {

  const mutation = useAddItemToCart()
  return (
    <LoadingButton      
    onClick={() =>  
        mutation.mutate({
          product,
          selectedOptions,
          quantity
        })
      }
      loading={mutation.isPending}
      className={cn("flex  gap-3",className)}
      {...props}
    >
      <ShoppingCartIcon />
        Adicionar ao carrinho
    </LoadingButton>
  );
}