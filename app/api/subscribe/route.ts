
import mailchimp from "@mailchimp/mailchimp_marketing"
import { NextResponse } from "next/server"




mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_SERVER_PREFIX!,
})

export async function POST(request: Request) {
    try {

        const { email } = await request.json()
        if (!email) {
            return NextResponse.json(
                { error: "L' addresse e-mail est requise." },
                { status: 400 }
            )
        }

        const res = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!,
            {
                email_address: email, status: "subscribed"
            }
        )



        return NextResponse.json({
            message: "Cette adresse e-mail est deja inscrite ou n'existe pas.", data: res
        },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({
            error: "Cette adresse e-mail est deja inscrite ou n'existe pas."
        },
            { status: 500 }
        )
    }

}