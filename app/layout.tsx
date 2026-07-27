import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allenks.com.ar"),
  title: "ALLEN KS | Dubstep Wacho",
  description:
    "Sitio oficial de ALLEN KS aka Dubstep Wacho. DJ, productor y promotor argentino. Creador de Otra Noche y director de Spartans Label.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    locale: "es_AR",
    type: "website",
    siteName: "ALLEN KS",
    title: "ALLEN KS | Dubstep Wacho",
    description:
      "DJ, productor y promotor argentino. Creador de Otra Noche y director de Spartans Label.",
    url: "https://www.allenks.com.ar/",
  },
  other: {
    "theme-color": "#050505",
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/allen-ks-logo.png",
    shortcut: "/assets/allen-ks-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
