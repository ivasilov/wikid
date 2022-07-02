import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import '../../styles/globals.css';
import { Layout } from '../components/layout';
import { useApollo } from '../utils/apollo-client';

// FocusStyleManager.onlyShowFocusOnTabs();

const defaultLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  const layout = (Component as any).layout || defaultLayout;

  return <ApolloProvider client={client}>{layout(<Component {...pageProps} />)}</ApolloProvider>;
}
