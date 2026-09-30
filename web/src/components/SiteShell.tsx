import { Footer } from "./Footer";
import { Header } from "./Header";
import { BackToTop } from "./BackToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="content" className="flex-1 pb-8">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
