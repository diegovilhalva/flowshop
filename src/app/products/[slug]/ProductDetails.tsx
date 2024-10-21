"use client"

import Badge from "@/components/ui/badge"
import WixImage from "@/components/WixImage"
import { products } from "@wix/stores"
import ProductOptions from "./ProductOptions"
import { useState } from "react"
import { checkInStock, findVariant } from "@/lib/utils"

interface ProductDetailsProps {
    product: products.Product
}


function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);

    const [selectedOptions, setSelectedOptions] = useState<
      Record<string, string>
    >(
      product.productOptions
        ?.map((option) => ({
          [option.name || ""]: option.choices?.[0].description || "",
        }))
        ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
    );
  
    const selectedVariant = findVariant(product, selectedOptions);
  
    const inStock = checkInStock(product, selectedOptions);
  
    const availableQuantity =
      selectedVariant?.stock?.quantity ?? product.stock?.quantity;
  
    const availableQuantityExceeded =
      !!availableQuantity && quantity > availableQuantity;
  
    const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
      const selectedChoice = option.choices?.find(
        (choice) => choice.description === selectedOptions[option.name || ""],
      );
      return selectedChoice?.media?.items ?? [];
    });

    return (
        <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <div className="basis-2/5">
                <WixImage mediaIdentifier={product.media?.mainMedia?.image?.url} alt={product.media?.mainMedia?.image?.altText} width={1000} height={1000} className="sticky top-0" />
            </div>
            <div className="basis-3/5 space-y-5">
                <div className="space-y-2.5">
                    <h1 className="text-3xl font-bold lg:text-4xl">
                        {product.name}
                    </h1>
                    {product.brand && (
                        <div className="text-muted-foreground">{product.brand}</div>
                    )}
                    {product.ribbon && (
                        <Badge className="block">{product.ribbon}</Badge>
                    )}
                </div>
                {product.description && (
                    <div dangerouslySetInnerHTML={{__html:product.description}} className="prose dark:prose-invert" />
                )}
                <ProductOptions product={product} setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions} />
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetails