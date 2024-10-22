"use client"

import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getCart, addToCart, AddToCartValues } from "@/wix-api/cart";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"]
export function useCart(initialData: currentCart.Cart | null) {
    return useQuery({
        queryKey,
        queryFn: () => getCart(wixBrowserClient),
        initialData
    })
}


export function useAddItemToCart() {
    const queryClient = useQueryClient()

    const { toast } = useToast()

    return useMutation({
        mutationFn: (values: AddToCartValues) =>
            addToCart(wixBrowserClient, values),
        onSuccess(data){
            toast({description:"Item adicionado ao carrinho"})
            queryClient.cancelQueries({queryKey})
            queryClient.setQueryData(queryKey,data.cart)
        },
        onError(error) {
            console.error(error)
            toast({variant:"destructive",description:"Ocorreu um erro,tente novamente mais tarde"})
        }
    })
}

