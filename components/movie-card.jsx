"use client"

import { Star, Bookmark, BookmarkCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MovieCard({ movie, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist, onClick }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/abstract-movie-poster.png"

  return (
    <Card className="movie-card group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300">
      <div onClick={onClick} className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 backdrop-blur-sm ring-1 ring-primary/30">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-semibold text-primary">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/30 hover:border-primary/50"
          onClick={(e) => {
            e.stopPropagation()
            isInWatchlist ? onRemoveFromWatchlist() : onAddToWatchlist()
          }}
        >
          {isInWatchlist ? (
            <BookmarkCheck className="h-4 w-4 text-primary" />
          ) : (
            <Bookmark className="h-4 w-4 text-primary/70" />
          )}
        </Button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 text-balance leading-tight">{movie.title}</h3>
        {movie.release_date && (
          <p className="text-xs text-muted-foreground mt-1">{new Date(movie.release_date).getFullYear()}</p>
        )}
      </div>
    </Card>
  )
}
