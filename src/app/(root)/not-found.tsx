import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-surface p-8 text-center">
        <p className="font-mono text-xs tracking-[0.24em] text-primary-bright">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">Sayfa bulunamadı / Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          İstenen sayfa bulunamadı. Varsayılan dile dönebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/tr" variant="primary" size="md">
            TR Ana Sayfa
          </Button>
          <Button href="/en" variant="secondary" size="md">
            EN Home
          </Button>
        </div>
      </div>
    </main>
  );
}