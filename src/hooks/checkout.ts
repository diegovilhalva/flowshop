import { useState } from "react";
import { useToast } from "./use-toast";
import { getCheckoutUrlForCurrentCart } from "@/wix-api/checkout";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useCartCheckout(){
    const {toast} = useToast()

    const [pending,setPending] = useState(false)

    async function startCheckoutFlow(){
        setPending(true)
        try {
            const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient)
            window.location.href = checkoutUrl
        } catch (error) {
            setPending(false)
            console.log(error)
            toast({
                variant:"destructive",
                description:"Erro ao carregar página de pagamento" 
            })
        }
    }

    return {startCheckoutFlow,pending}
}