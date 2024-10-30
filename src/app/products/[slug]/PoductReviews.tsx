"use client";
import LoadingButton from "@/components/LoadingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getProductReviews } from "@/wix-api/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviews } from "@wix/reviews";
import { products } from "@wix/stores";
import { CornerDownRight, StarIcon } from "lucide-react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk"
import Zoom from "react-medium-image-zoom"
import logo from "@/assets/logo.png"
import WixImage from "@/components/WixImage";

interface ProductReviewsProps {
  product: products.Product
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["product-reviews", product._id],
    queryFn: async ({ pageParam }) => {
      if (!product._id) {
        throw Error("Id de produto não encontrado")
      }
      const pageSize = 2

      return getProductReviews(wixBrowserClient, {
        productId: product._id,
        limit: pageSize,
        cursor: pageParam
      })
    },
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.filter(
          (item) =>
            item.moderation?.moderationStatus ===
            reviews.ModerationModerationStatus.APPROVED,
        ),
      })),
    }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.cursors.next
  })

  const reviewItems = data?.pages.flatMap(page => page.items) || []

  return (
    <div className="space-y-5">
      {status === "pending" && <ProductReviewsLoadingSkeleton />}
      {status === "error" && (
        <p className="text-destructive">Erro ao carregar avaliações</p>
      )}
      {status === "success" && !reviewItems.length && !hasNextPage && (
        <p>Ainda não há avaliações</p>
      )}
      <div className="divide-y">
        {reviewItems.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
      {hasNextPage && (
        <LoadingButton
          loading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Ver mais avaliações
        </LoadingButton>
      )}
    </div>
  )
}


export function ProductReviewsLoadingSkeleton() {
  return <div className="space-y-10">
    {Array.from({ length: 3 }).map((_, i) => (
      <div className="space-y-1.5" key={i}>
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-16 w-72" />
      </div>
    ))}
  </div>
}


interface ReviewProps {
  review: reviews.Review;
}

function Review({
  review: { author, reviewDate, content, reply },
}: ReviewProps) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "size-5 text-primary",
                i < (content?.rating || 0) && "fill-primary",
              )}
            />
          ))}
          {content?.title && <h3 className="font-bold">{content.title}</h3>}
        </div>
        <p className="text-sm text-muted-foreground">
          por {author?.authorName || "Anônimo"}
          {reviewDate && <> em {new Date(reviewDate).toLocaleDateString()}</>}
        </p>
        {content?.body && (
          <div className="whitespace-pre-line">{content.body}</div>
        )}
        {!!content?.media?.length && (
          <div className="flex flex-wrap gap-2">
            {content.media.map((media) => (
              <MediaAttachment key={media.image || media.video} media={media} />
            ))}
          </div>
        )}
      </div>
      {reply?.message && (
        <div className="ms-10 mt-2.5 space-y-1 border-t pt-2.5">
          <div className="flex items-center gap-2">
            <CornerDownRight className="size-5" />
            <Image
              src={logo}
              alt="Flow Store logo"
              width={24}
              height={24}
              className="size-5"
            />
            <span className="font-bold">Equipe Flow Shop</span>
          </div>
          <div className="whitespace-pre-line">{reply.message}</div>
        </div>
      )}
    </div>
  );
}


interface MediaAttachmentProps {
  media: reviews.Media;
}

function MediaAttachment({ media }: MediaAttachmentProps) {
  if (media.image) {
    return (
      <Zoom>
        <WixImage
          mediaIdentifier={media.image}
          alt="Review media"
          scaleToFill={false}
          className="max-h-40 max-w-40 object-contain"
        />
      </Zoom>
    );
  }

  if (media.video) {
    return (
      <video controls className="max-h-40 max-w-40">
        <source src={wixMedia.getVideoUrl(media.video).url} type="video/mp4" />
      </video>
    );
  }

  return <span className="text-destructive">Formato de midia não suportado</span>;
}

