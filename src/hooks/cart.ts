"use client"

import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getCart, addToCart, AddToCartValues, UpdateCartItemQuantityValues, updateCartItemQuantity, removeCartItem } from "@/wix-api/cart";
import { MutationKey, QueryClient, QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        onSuccess(data) {
            toast({ description: "Item adicionado ao carrinho" })
            queryClient.cancelQueries({ queryKey })
            queryClient.setQueryData(queryKey, data.cart)
        },
        onError(error) {
            console.error(error)
            toast({ variant: "destructive", description: "Ocorreu um erro,tente novamente mais tarde" })
        }
    })
}

export function useUpdateCartItemQuantity() {
    const queryClient = useQueryClient()

    const { toast } = useToast()

    const mutationKey: MutationKey = ["updateCartItemQuantity"]
    return useMutation({
        mutationKey,
        mutationFn: (values: UpdateCartItemQuantityValues) => updateCartItemQuantity(wixBrowserClient, values),
        onMutate: async ({ productId, newQuantity }) => {
            await queryClient.cancelQueries({ queryKey })

            const previousState = queryClient.getQueryData<currentCart.Cart>(queryKey)

            queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
                ...oldData,
                lineItems: oldData?.lineItems?.map(lineItem => lineItem._id === productId ? { ...lineItem, quantity: newQuantity } : lineItem,),
            }))
            return { previousState }
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousState)
            console.error(error)
            toast({
                variant: "destructive",
                description: "Ocorreu um erro, tente novamente mais tarde",
            })
        },
        onSettled() {
            if (queryClient.isMutating({ mutationKey }) === 1) {
                queryClient.invalidateQueries({ queryKey });
            }
        }
    })
}

export function useRemoveCartItem() {

    const queryClient = useQueryClient()

    const { toast } = useToast()
    return useMutation({
        mutationFn:(productId:string) => removeCartItem(wixBrowserClient,productId),
        onMutate:async (productId) => {
            await queryClient.cancelQueries({queryKey})

            const previousState = queryClient.getQueryData<currentCart.Cart>(queryKey)

            queryClient.setQueryData<currentCart.Cart>(queryKey,(oldData) => ({
                ...oldData,
                lineItems: oldData?.lineItems?.filter(
                  (lineItem) => lineItem._id !== productId,
                ),
            }))
            return {previousState}
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey,context?.previousState)
            console.error(error)
            toast({
                variant:"destructive",
                description:"Ocorreu um erro, tente novamente mais tarde"
            })
        },
        onSettled(){
            queryClient.invalidateQueries({queryKey})
        }
    })
}