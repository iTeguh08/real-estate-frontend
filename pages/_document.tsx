import { Head, Html, Main, NextScript } from 'next/document';

/** Mirrors `index.html` theme bootstrap so navy/light tokens apply before paint. */
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('hz-theme');if(t==='navy'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

/**
 * Custom Document must render `Head`, `Main`, and `NextScript` from `next/document`.
 * Theme bootstrap is a blocking inline script — `next/script` inside `Head` can
 * prevent Next from flushing the CSS `<link>` / `#__next_css__DO_NOT_USE__` anchor
 * used to inject Tailwind on hard reload.
 */
export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E07030" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </Head>
      <body className="font-poppins antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
