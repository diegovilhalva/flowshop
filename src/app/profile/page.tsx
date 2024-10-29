import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberInfoForm from "./MemberInfoForm";
import Orders from "./Orders";

export const metadata:Metadata = {
    title:"Perfil",
    description:"Suas informações de perfil"
}


export default async function Page(){
    const member = await getLoggedInMember(getWixServerClient())

    if(!member) notFound()

    return (
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-10">
            <h1 className="text-center text-3xl font-bold md:text-4xl">
                Seu perfil
            </h1>
            <MemberInfoForm member={member} />
            <Orders />
        </div>
    )
}