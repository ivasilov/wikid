import { Head, Html, Main, NextScript } from 'next/document';
import { inter } from './_app.page';

export default function Document() {
  return (
    <Html className="h-full bg-gray-100">
      <Head />
      <body className={`${inter.variable} font-sans`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
