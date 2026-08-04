import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "@/lib/prisma"


export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization:{
                params:{
                    scope:"read:user user:email"
                }
            }
        })
    ],
    // pages: {
    //     signIn: "/sign-in"
    // },
    callbacks: {
        // write the signIn callback later for the OAuth Login for the Onboarding Page when for the 1st time signup users and using account params in signin to check provider github and get the user github URL and save it in the DB. Either do it in signin callback or in the githubprovider profile callback and send back the details in objects like email:profile.email,etc.

        async session({ session, user }) {
            if (user) {
                session.user.id = user.id
                session.user.name = user.name
                session.user.email = user.email
                session.user.isOnboarded = (user as any).isOnboarded
            }
            return session
        }
    }
}