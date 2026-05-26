"use client"

import { Topic } from "@/types/topic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, GitBranch, Box, Workflow, Server, Code } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  git: GitBranch,
  docker: Box,
  cicd: Workflow,
  kubernetes: Server,
  default: Code,
}

function getIconForTopic(title: string): React.ElementType {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("git") || lowerTitle.includes("version")) return iconMap.git
  if (lowerTitle.includes("docker") || lowerTitle.includes("contenedor")) return iconMap.docker
  if (lowerTitle.includes("ci/cd") || lowerTitle.includes("pipeline")) return iconMap.cicd
  if (lowerTitle.includes("kubernetes")) return iconMap.kubernetes
  return iconMap.default
}

interface TopicCardProps {
  topic: Topic
  index: number
}

export function TopicCard({ topic, index }: TopicCardProps) {
  const Icon = getIconForTopic(topic.title)

  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <CardTitle className="mt-4 text-lg leading-tight text-foreground">
          {topic.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {topic.description}
        </CardDescription>

        <a
          href={topic.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Ver documentacion
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  )
}
