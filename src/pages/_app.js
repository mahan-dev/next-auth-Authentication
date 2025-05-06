import "@/styles/globals.css";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
