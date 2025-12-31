"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Bookmark, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MovieCard } from "@/components/movie-card"
import { MovieDetails } from "@/components/movie-details"
import { GenreFilter } from "@/components/genre-filter"
import { useMovies } from "@/hooks/use-movies"
import { useWatchlist } from "@/hooks/use-watchlist"

export default function MovieExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showWatchlist, setShowWatchlist] = useState(false)

  const { movies, loading, error, searchMovies, fetchTrending } = useMovies()
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  useEffect(() => {
    fetchTrending()
  }, [])

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        searchMovies(searchQuery)
      } else {
        fetchTrending()
      }
    },
    [searchQuery, searchMovies, fetchTrending],
  )

  const filteredMovies = useMemo(
    () =>
      selectedGenres.length > 0
        ? movies.filter((movie) => movie.genre_ids?.some((id) => selectedGenres.includes(id)))
        : movies,
    [movies, selectedGenres],
  )

  const displayMovies = useMemo(() => (showWatchlist ? watchlist : filteredMovies), [showWatchlist, watchlist, filteredMovies])

  const handleGenreToggle = useCallback((genreId) => {
    setSelectedGenres((prev) => (prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]))
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 blur-md"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 ring-2 ring-primary/50 shadow-lg shadow-primary/30">
                  <span className="text-2xl font-bold tracking-tighter">
                    <span className="text-primary-foreground">K</span>
                    <span className="text-white">X</span>
                  </span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
                <span className="neon-text text-primary">Kino</span>
                <span className="text-foreground"> Xplorer</span>
              </h1>
            </div>

            <form onSubmit={handleSearch} className="order-3 w-full max-w-xl md:order-2 md:w-auto md:flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-primary/20 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
            </form>

            <Button
              variant={showWatchlist ? "default" : "outline"}
              size="sm"
              onClick={() => setShowWatchlist(!showWatchlist)}
              className="order-2 gap-2 border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 md:order-3"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 px-1.5 py-0.5 text-xs bg-primary/20 text-primary border-primary/30"
                >
                  {watchlist.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Genre Filter */}
      {!showWatchlist && (
        <div className="border-b border-primary/10 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-balance">
            {showWatchlist ? "Your Watchlist" : searchQuery ? `Search Results for "${searchQuery}"` : "Trending Movies"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {showWatchlist ? `${watchlist.length} movies saved` : `${displayMovies.length} movies found`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-8 text-center bg-destructive/10 border-destructive/20">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchTrending} variant="outline">
              Try Again
            </Button>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && displayMovies.length === 0 && (
          <Card className="p-12 text-center bg-card/50 border-primary/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4 ring-2 ring-primary/20">
              {showWatchlist ? (
                <Bookmark className="h-10 w-10 text-primary" />
              ) : (
                <span className="text-3xl font-bold tracking-tighter">
                  <span className="text-primary">K</span>
                  <span className="text-white">X</span>
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {showWatchlist ? "No movies in watchlist" : "No movies found"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {showWatchlist
                ? "Start adding movies to your watchlist to see them here"
                : "Try adjusting your search or filters"}
            </p>
            {showWatchlist && (
              <Button onClick={() => setShowWatchlist(false)} variant="outline" className="border-primary/30">
                Browse Movies
              </Button>
            )}
          </Card>
        )}

        {/* Movies Grid */}
        {!loading && !error && displayMovies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isInWatchlist={isInWatchlist(movie.id)}
                onAddToWatchlist={() => addToWatchlist(movie)}
                onRemoveFromWatchlist={() => removeFromWatchlist(movie.id)}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          isInWatchlist={isInWatchlist(selectedMovie.id)}
          onAddToWatchlist={() => addToWatchlist(selectedMovie)}
          onRemoveFromWatchlist={() => removeFromWatchlist(selectedMovie.id)}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-primary/10 bg-background/50 backdrop-blur-sm">
        <p>&copy; Omar 2026. All Rights Reserved</p>
      </footer>
    </div>
  )
}
