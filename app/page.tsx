import { Header } from "@/components/header"
import { TopicsContainer } from "@/components/topics-container"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Aprende DevOps y Control de Versiones
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Explora los conceptos fundamentales del desarrollo moderno: desde 
              el control de versiones con Git hasta la orquestacion de 
              contenedores con Kubernetes. Cada tema incluye enlaces a 
              documentacion oficial.
            </p>
          </div>
        </section>

        <TopicsContainer />
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Conectado a la API de Topics
          </p>
        </div>
      </footer>
    </div>
  )
}
