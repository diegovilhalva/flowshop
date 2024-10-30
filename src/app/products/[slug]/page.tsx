
import { getProductBySlug, getRelatedProducts } from "@/wix-api/products"
import { notFound } from "next/navigation"
import ProductDetails from "./ProductDetails"
import { Metadata } from "next"
import { delay } from "@/lib/utils"
import { getWixServerClient } from "@/lib/wix-client.server"
import { Suspense } from "react"
import Product from "@/components/Product"
import { Skeleton } from "@/components/ui/skeleton"
import CreateProductReviewButton from "@/components/reviews/CreateProductReviewButton"
import ProductReviews, { ProductReviewsLoadingSkeleton } from "./PoductReviews"
import { products } from "@wix/stores"
import { getLoggedInMember } from "@/wix-api/members"
import { getProductReviews } from "@/wix-api/reviews"

interface PageProps {
    params: { slug: string }
}

export async function generateMetada({ params: { slug } }: PageProps): Promise<Metadata> {
    const product = await getProductBySlug(getWixServerClient(), slug)
    if (!product) notFound()

    const mainImage = product.media?.mainMedia?.image

    return {
        title: product.name,
        description: "Compre esse produto na Flow Shop",
        openGraph: {
            images: mainImage?.url
                ? [
                    {
                        url: mainImage.url,
                        width: mainImage.width,
                        height: mainImage.height,
                        alt: mainImage.altText || ""
                    }
                ] : undefined,
        }
    }
}

export default async function Page({ params: { slug } }: PageProps) {
    await delay(3000)
    const product = await getProductBySlug(getWixServerClient(), slug)

    if (!product?._id) notFound()
    return (<main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
        <ProductDetails product={product} />
        <hr />
        <Suspense fallback={<RelatedProductsLoadingSkeleton/>}>
            <RelatedProduts productId={product._id} />
        </Suspense>
        <hr />
        <div className="space-y-5">
            <h2 className="text-2xl fonrt">
                Avaliações dos clientes
            </h2>
            <Suspense fallback={<ProductReviewsLoadingSkeleton/>}>
                <ProductReviewsSection product={product} />
            </Suspense>
        </div>
    </main>)
}

interface RelatedProdutsProps {
    productId: string
}

async function RelatedProduts({ productId }: RelatedProdutsProps) {
    await delay(2000);

    const relatedProducts = await getRelatedProducts(
      getWixServerClient(),
      productId,
    );
  
    if (!relatedProducts.length) return null;
  
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Produtos relacionados</h2>
        <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
}

function RelatedProductsLoadingSkeleton() {
    return (
      <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] w-full" />
        ))}
      </div>
    );
}

interface ProductReviewsSectionProps {
    product: products.Product;
  }
  
  async function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
    if (!product._id) return null;
  
    const wixClient = getWixServerClient();
  
    const loggedInMember = await getLoggedInMember(wixClient);
  
    const existingReview = loggedInMember?.contactId
      ? (
          await getProductReviews(wixClient, {
            productId: product._id,
            contactId: loggedInMember.contactId,
          })
        ).items[0]
      : null;
  
    await delay(5000);
  
    return (
      <div className="space-y-5">
        <CreateProductReviewButton
          product={product}
          loggedInMember={loggedInMember}
          hasExistingReview={!!existingReview}
        />
        <ProductReviews product={product} />
      </div>
    );
  }