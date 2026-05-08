import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-hero px-4">
      <div className="text-center glass rounded-3xl p-10 max-w-md">
        <h1 className="font-display text-7xl text-gradient-gold">404</h1>
        <p className="mt-3 text-muted-foreground">This page seems to be off the syllabus.</p>
        <Link to="/" className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-[var(--gradient-gold)] text-gold-foreground text-sm font-medium">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center glass rounded-3xl p-10 max-w-md">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-5 py-2.5 rounded-lg bg-[var(--gradient-gold)] text-gold-foreground text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lumin — Premium LL.B Exam Prep for Delhi University" },
      { name: "description", content: "Interactive video lectures, PYQs, case summaries and model answers for Delhi University LL.B students." },
      { property: "og:title", content: "Lumin — LL.B Exam Prep, Reimagined" },
      { property: "og:description", content: "Premium video lectures and exam material crafted for DU LL.B students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col bg-background relative">
          <div className="absolute inset-x-0 top-0 h-[800px] bg-hero -z-10 pointer-events-none" />
          <Header />
          <main className="flex-1 pt-16">
            <Outlet />
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
