type StaticPageProps = {
  title: string;
  children: React.ReactNode;
};

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="container-xl px-2 md:px-0 mt-8 mb-12">
      <header className="mb-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">{title}</h1>
        <span className="section-underline text-primary" />
      </header>
      <div className="mx-auto max-w-3xl space-y-4 text-[1.05rem] leading-8 text-[#222]">
        {children}
      </div>
    </div>
  );
}
