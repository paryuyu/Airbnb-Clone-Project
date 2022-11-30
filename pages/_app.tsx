import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { NextPage } from 'next'
import Layout from '../components/layout'
import { Backdrop, CircularProgress } from '@mui/material'
import { createContext, useState } from "react";

export const BackDropContext = createContext<any|null>(null);

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  //구글 로그인 팝업창 띄울때 기본 레이아웃 분리하기.
  const { isLayout } = Component as (NextPage & { isLayout?: boolean });
  const [backdrop, setBackDrop] =useState<boolean>(false)
  const handleClose = ()=>{
    setBackDrop(false)
  }
  return (
<BackDropContext.Provider value={{backdrop, setBackDrop}}>
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
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </SessionProvider>
    </BackDropContext.Provider>
  )
}
