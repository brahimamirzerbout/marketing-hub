import Link from "next/link";

export function Footer() {
  return <footer className="site-container mt-16 border-t py-8 text-sm text-muted-foreground">
    <div className="flex flex-wrap items-center justify-between gap-6">
      <p className="max-w-xl">Independent reference built with <a className="text-foreground underline underline-offset-4" href="https://ui.shadcn.com/">shadcn/ui</a>. Original component code is MIT licensed.</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
        <Link href="/docs">Docs</Link><Link href="/components">Components</Link><Link href="/blocks">Blocks</Link><Link href="/charts">Charts</Link><Link href="/themes">Themes</Link>
        <a href="https://github.com/shadcn-ui/ui">GitHub</a><a href="https://twitter.com/shadcn">X</a><a href="https://ui.shadcn.com/docs">Community & documentation</a><Link href="/about">About & licenses</Link>
      </nav>
    </div><p className="mt-6 text-xs">All financial, activity, and assistant examples use demonstration data. No connected accounts or live AI.</p>
  </footer>;
}
