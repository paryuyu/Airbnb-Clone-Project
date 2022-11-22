import nextAuth, { Awaitable, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import user from "../../../lib/model/user";
import { compare } from "bcryptjs"
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { signIn } from "next-auth/react";
import assert from "assert";
import dbConnect from "../../../lib/db_connect";

type Credentials = {
    redirect: boolean,
    email: string,
    password: string,
    csrfToken: string,
    callbackUrl: string,
    json: boolean
}

//함수호출
export const authOption: NextAuthOptions = {
    pages: { error: "/auth/error" },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                console.log(credentials, "credentials");
                console.log(req, "req");
                const one = await user.findOne({ email: credentials!.email }) as any

                if (!one || !(await compare(credentials!.password, one.password))) {
                    throw new Error(`invalid email/password`)
                }

                return one as any;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn(params: any) {
            await dbConnect()
            //소셜 로그인 -> findemail해서 email이 있으면 return true
            //email이 없으면 return false -> 회원가입으로 가주기.
            console.log(params, "params")
            //회원가입으로 가기.(로컬)
            if (params.account?.provider === "credentials") {
                return true;
            }

            let rst = await user.findOne({ email: params.user.email }).lean();
            if (rst !== null && (params.account?.provider === "google" || params.account?.provider === "kakao")) {
                //디비에 데이터가 있 -> 회원가입 완료된 상태라는거니깐 그냥 꺼주기.
                //근데 여기서 계정아이디값을 생각해야함.
                return true;

            } else {
                //데이터가 없 -> 회원가입(팝업창이 새로 열리는데...)
                //여기서 에러 페이지(독립)으로 가면...회원가입을 여기서 해야함
                //독립페이지는 그냥 새로 만들자.

                let url = process.env.NEXT_PUBLIC_SERVER_URL;
                let urlparams = new URLSearchParams();
                urlparams.append("lastname", params.profile.given_name)
                urlparams.append("firstname", params.profile.family_name)
                urlparams.append("provider", params.account.provider)
                urlparams.append("providerAccountId", params.account.providerAccountId)
                urlparams.append("email", params.user.email)
                return url+"/auth/error?error=Duplicated&" + urlparams;
            }

            //여기서 return을 true로 보내면 바로 로그인 인증으로
            //return false나 Error를 던지거나
            //파라미터값을 보내주면 됨.
            // 로그인을 여기서 걸러줘야함.
            //throw new Error("Duplicated");
            //return "/auth/error?error=Duplicated&email=salzte"
        }
    }


} as any;


export default nextAuth(authOption);