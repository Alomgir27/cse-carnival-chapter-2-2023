import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react"
import { store } from "@/reduxStore/store";
import { Provider } from "react-redux";
import "@/app/globals.css"
import "../styles/globals.css";


export default function App({ Component, pageProps: { session, ...pageProps } } : any) {
    return (
        <Provider store={store}>
                <SessionProvider session={session}>
                        <NextNProgress
                            color="#29D"
                            startPosition={0.3}
                            stopDelayMs={200}
                            height={3}
                            showOnShallow={true}
                        />
                        <Component {...pageProps} />
                </SessionProvider>
        </Provider>
    );
}