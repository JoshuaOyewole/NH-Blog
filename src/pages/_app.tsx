import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import ErrorBoundary from './_error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>

      <Head>
        <title>Townhall Blog | Team Updates</title>
        <meta
          name="description"
          content="Welcome to Townhall. Townhall is a community mobilization app that enables organizations, the public, and causes to create & efficiently manage localized assemblies, interaction, and momentum around common goals."
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
