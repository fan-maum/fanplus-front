import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// export const SideBarContext = createContext<SideBarContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
