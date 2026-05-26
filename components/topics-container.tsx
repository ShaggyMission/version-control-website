"use client"

import useSWR from "swr"
import { Topic } from "@/types/topic"
import { TopicsGrid } from "./topics-grid"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Error al cargar los temas")
  return res.json()
})

export function TopicsContainer() {
  const { data: topics, error, isLoading, mutate } = useSWR<Topic[]>(
    `${API_URL}/api/topics`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Cargando temas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Error de conexion
        </h3>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          No se pudo conectar con la API. Asegurate de que el servidor este corriendo en{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            {API_URL}
          </code>
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => mutate()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      </div>
    )
  }

  if (!topics || topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">No hay temas disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {topics.length} temas disponibles
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => mutate()}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
      </div>
      <TopicsGrid topics={topics} />
    </div>
  )
}
