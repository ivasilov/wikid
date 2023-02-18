import { ApolloProvider } from '@apollo/client';
import localFont from '@next/font/local';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import '../../styles/globals.css';
import { Layout } from '../components/layout';
import { useApollo } from '../utils/apollo-client';

// FocusStyleManager.onlyShowFocusOnTabs();

export const inter = localFont({
  variable: '--font-inter',
  src: [
    {
      style: 'normal',
      weight: '100',
      path: '../../public/Inter/Inter-Thin.woff2',
    },
    {
      style: 'italic',
      weight: '100',
      path: '../../public/Inter/Inter-ThinItalic.woff2',
    },
    {
      style: 'normal',
      weight: '200',
      path: '../../public/Inter/Inter-ExtraLight.woff2',
    },
    {
      style: 'italic',
      weight: '200',
      path: '../../public/Inter/Inter-ExtraLightItalic.woff2',
    },

    {
      style: 'normal',
      weight: '300',
      path: '../../public/Inter/Inter-Light.woff2',
    },
    {
      style: 'italic',
      weight: '300',
      path: '../../public/Inter/Inter-LightItalic.woff2',
    },

    {
      style: 'normal',
      weight: '400',
      path: '../../public/Inter/Inter-Regular.woff2',
    },
    {
      style: 'italic',
      weight: '400',
      path: '../../public/Inter/Inter-Italic.woff2',
    },

    {
      style: 'normal',
      weight: '500',
      path: '../../public/Inter/Inter-Medium.woff2',
    },
    {
      style: 'italic',
      weight: '500',
      path: '../../public/Inter/Inter-MediumItalic.woff2',
    },

    {
      style: 'normal',
      weight: '600',
      path: '../../public/Inter/Inter-SemiBold.woff2',
    },
    {
      style: 'italic',
      weight: '600',
      path: '../../public/Inter/Inter-SemiBoldItalic.woff2',
    },

    {
      style: 'normal',
      weight: '700',
      path: '../../public/Inter/Inter-Bold.woff2',
    },
    {
      style: 'italic',
      weight: '700',
      path: '../../public/Inter/Inter-BoldItalic.woff2',
    },

    {
      style: 'normal',
      weight: '800',
      path: '../../public/Inter/Inter-ExtraBold.woff2',
    },
    {
      style: 'italic',
      weight: '800',
      path: '../../public/Inter/Inter-ExtraBoldItalic.woff2',
    },

    {
      style: 'normal',
      weight: '900',
      path: '../../public/Inter/Inter-Black.woff2',
    },
    {
      style: 'italic',
      weight: '900',
      path: '../../public/Inter/Inter-BlackItalic.woff2',
    },
    {
      weight: '100 900',
      style: 'normal',
      path: '../../public/Inter/Inter-roman.var.woff2',
    },
    {
      weight: '100 900',
      style: 'italic',
      path: '../../public/Inter/Inter-italic.var.woff2',
    },
  ],
});

const defaultLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  const layout = (Component as any).getLayout || defaultLayout;

  return <ApolloProvider client={client}>{layout(<Component {...pageProps} />)}</ApolloProvider>;
}
