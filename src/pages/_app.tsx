// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import { httpLink } from "@trpc/client/links/httpLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const getBaseUrl = () => {
  if (typeof window !== undefined) return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      // links: [
      //   // adds pretty logs to your console in development and logs errors in production
      //   loggerLink({
      //     enabled: (opts) =>
      //       process.env.NODE_ENV === "development" ||
      //       (opts.direction === "down" && opts.result instanceof Error),
      //   }),
      //   httpLink({
      //     url: url,
      //   }),
      // ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
