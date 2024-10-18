import banner from "@/assets/banner.jpg"
import Product from "@/components/Product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import {  getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default  function Home() {
  return (
    <main className="max-w-7xl mx-auto px-5 py-10 space-y-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold">Sua Jornada de Estilo Começa Aqui!</h1>
          <p className="">Roupas e acessórios que elevam seu dia a dia</p>
          <Button asChild>
            <Link href="/shop">Compre agora
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden md:block  w-1/2 h-full">
          <Image src={banner} alt="banner image" className="h-full object-cover" />
          <div className="absolute  inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent"/>
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton/>}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}


async function FeaturedProducts(){
  await delay(1000)


 const collection = await getCollectionBySlug("destaques")

  if(!collection?._id){
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds:collection._id,
  })

  if(!featuredProducts.items.length){
      return null
  }


  
  return (<div className="space-y-5">
    <h2 className="text-2xl font-bold">Produtos em detaque</h2>
    <div className="flex flex-col sm:grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {featuredProducts.items.map((product) => (
      <Product key={product._id} product={product} />
    ))}
    </div>
  </div>)
}



function LoadingSkeleton(){
  return <div  className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
    {Array.from({length:9}).map((_,i) => (
      <Skeleton key={i} className="h-[26rem] w-full" />
    ))}
  </div>
}