import type { Metadata } from "next";
import "./signal.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allenks.com.ar"),
  title: "ALLEN KS — Signal Universe",
  description: "ALLEN KS — DJ y productor argentino. Música, fechas, merch, Spartans Label y Otra Noche.",
  robots: { index: true, follow: true },
  openGraph: {
    locale: "es_AR",
    type: "website",
    siteName: "ALLEN KS",
    title: "ALLEN KS — Signal Universe",
    description: "Música, fechas, merch y proyectos de ALLEN KS.",
    url: "https://www.allenks.com.ar/",
  },
  other: { "theme-color": "#08080a" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
