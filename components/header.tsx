import { GitBranch, Terminal, Layers } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                DevOps & Versionamiento
              </h1>
              <p className="text-sm text-muted-foreground">
                Guia completa de desarrollo moderno
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <span>Git</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              <span>DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
