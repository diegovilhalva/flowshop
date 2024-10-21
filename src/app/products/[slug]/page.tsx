import Product from "@/components/Product"
import { getProductBySlug } from "@/wix-api/products"
import { notFound } from "next/navigation"

interface PageProps {
    params:{slug:string}
}

export default async function Page({params:{slug}}:PageProps){
    const product = await getProductBySlug(slug)

    if(!product?._id) notFound()


        return <main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
            <Product product={product} />
            <pre>
                {JSON.stringify(product,null,2)}
            </pre>
        </main>
}