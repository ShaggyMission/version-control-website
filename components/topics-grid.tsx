"use client"

import { Topic } from "@/types/topic"
import { TopicCard } from "./topic-card"

interface TopicsGridProps {
  topics: Topic[]
}

export function TopicsGrid({ topics }: TopicsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, index) => (
        <TopicCard key={topic.id} topic={topic} index={index} />
      ))}
    </div>
  )
}
