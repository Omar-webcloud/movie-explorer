"use client"

import { Badge } from "@/components/ui/badge"

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
]

export function GenreFilter({ selectedGenres, onGenreToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map((genre) => {
        const isSelected = selectedGenres.includes(genre.id)
        return (
          <Badge
            key={genre.id}
            variant={isSelected ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => onGenreToggle(genre.id)}
          >
            {genre.name}
          </Badge>
        )
      })}
    </div>
  )
}
