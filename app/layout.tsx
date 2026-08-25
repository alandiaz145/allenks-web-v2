import type { Metadata } from "next";
import "./migration-base.css";
import "./migration-sections.css";
import "./migration-responsive.css";
import "./v3-clean.css";
import "./v10.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allenks.com.ar"),
  title: "ALLEN KS | Dubstep Wacho",
  description: "Artista argentino, creador de Otra Noche y fundador de Spartans Label. Descubrí su música, próximas fechas y proyectos.",
  robots: { index: true, follow: true },
  openGraph: {
    locale: "es_AR",
    type: "website",
    siteName: "ALLEN KS",
    title: "ALLEN KS | Dubstep Wacho",
    description: "Artista argentino, creador de Otra Noche y fundador de Spartans Label.",
    url: "https://www.allenks.com.ar/",
  },
  other: { "theme-color": "#090606" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
