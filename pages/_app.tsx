import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { NextPage } from 'next'
import Layout from '../components/layout'


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  //구글 로그인 팝업창 띄울때 기본 레이아웃 분리하기.
  const { isLayout } = Component as (NextPage & { isLayout?: boolean });

  return (

    <SessionProvider session={session}>
      {isLayout && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )
      }

      {!isLayout && (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
