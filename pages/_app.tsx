import NextNProgress from "nextjs-progressbar";
import { store } from "@/reduxStore/store";
import { Provider } from "react-redux";
import "@/app/globals.css"
import "../styles/globals.css";


export default function App({ Component, pageProps: { ...pageProps } }: any) {
    return (
        <Provider store={store}>
            <NextNProgress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <Component {...pageProps} />
        </Provider>
    );
}