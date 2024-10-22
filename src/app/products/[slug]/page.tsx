
import { getProductBySlug } from "@/wix-api/products"
import { notFound } from "next/navigation"
import ProductDetails from "./ProductDetails"
import { Metadata } from "next"
import { delay } from "@/lib/utils"
import { getWixServerClient } from "@/lib/wix-client.server"

interface PageProps {
    params:{slug:string}
}

export async function generateMetada({params:{slug}}:PageProps):Promise<Metadata>{
    const product = await getProductBySlug(getWixServerClient(),slug)
    if (!product) notFound()
    
    const mainImage = product.media?.mainMedia?.image

    return {
        title:product.name,
        description:"Compre esse produto na Flow Shop",
        openGraph:{
            images:mainImage?.url
            ? [
                {
                    url:mainImage.url,
                    width:mainImage.width,
                    height:mainImage.height,
                    alt:mainImage.altText || ""
                }
            ]: undefined, 
        }
    }
}

export default async function Page({params:{slug}}:PageProps){
    await delay(3000)
    const product = await getProductBySlug(getWixServerClient(),slug)

    if(!product?._id) notFound()
       return (<main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
            <ProductDetails product={product} />
        </main>)
}