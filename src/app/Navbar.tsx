
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import { getCart } from "@/wix-api/cart"
import { getLoggedInMember } from "@/wix-api/members"
import { getWixServerClient } from "@/lib/wix-client.server"
import ShoppingCartButton from "./ShoppingCartButton"
import UserButton from "@/components/UserButton"
import { getCollections } from "@/wix-api/collections"
import MainNavigation from "./MainNavigation"
import SearchField from "@/components/SearchField"





export default async function Navbar() {

    const wixClient = getWixServerClient();
    const [cart, loggedInMember, collections] = await Promise.all([
        getCart(wixClient),
        getLoggedInMember(wixClient),
        getCollections(wixClient)
    ]);



    return (
        <header className="bg-background shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
                <div className="flex flex-wrap items-center gap-5">
                    <Link href={"/"} className="flex items-center gap-4">
                        <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
                        <span className="text-xl font-bold">Flow Shop</span>
                    </Link>
                    <MainNavigation collections={collections} />
                </div>
                <SearchField className="max-w-96" />
                <div className="flex items-center justify-center gap-5">
                    <UserButton loggedInMember={loggedInMember} />
                    <ShoppingCartButton initialData={cart} />
                </div>

            </div>

        </header>
    )
}