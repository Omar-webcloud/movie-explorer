"use client"

import { X, Star, Calendar, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

export function MovieDetails({ movie, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist, onClose }) {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/movie-backdrop.png"

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/abstract-movie-poster.png"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card rounded-xl border border-primary/20 shadow-2xl shadow-primary/10">
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border border-primary/30 hover:border-primary/50"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Backdrop */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img src={backdropUrl || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative px-6 pb-8 -mt-32 md:-mt-40">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                className="w-48 md:w-56 rounded-lg shadow-2xl ring-2 ring-primary/30"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">{movie.title}</h2>
                {movie.release_date && (
                  <p className="text-muted-foreground mt-1">{new Date(movie.release_date).getFullYear()}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 ring-1 ring-primary/30">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold text-primary">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-muted-foreground">({movie.vote_count?.toLocaleString()} votes)</span>
                  </div>
                )}

                {movie.release_date && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {movie.genre_ids && movie.genre_ids.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.map((genreId) => (
                    <Badge
                      key={genreId}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border-primary/30"
                    >
                      {GENRE_MAP[genreId] || "Unknown"}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movie.overview && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{movie.overview}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={isInWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
                  className="gap-2 shadow-lg shadow-primary/20"
                  variant={isInWatchlist ? "secondary" : "default"}
                >
                  {isInWatchlist ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      Add to Watchlist
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
