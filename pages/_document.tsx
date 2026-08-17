import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

/** Mirrors `index.html` theme bootstrap so navy/light tokens apply before paint. */
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('hz-theme');if(t==='navy'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <meta name="theme-color" content="#E07030" />
        <meta
          name="description"
          content="Homzen — discover luxury homes, villas, and apartments for sale and rent."
        />
        <Script id="hz-theme" strategy="beforeInteractive">
          {THEME_BOOTSTRAP}
        </Script>
      </Head>
      <body className="font-poppins antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
