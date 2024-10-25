import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") 
      .ne("_id", "0e01b3fb-bc69-0f8f-36b0-b7b270f53772") 
      .find();

    return collections.items;
  },
);