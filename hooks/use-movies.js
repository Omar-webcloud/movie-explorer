"use client"

import { useState } from "react"

const TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTrending = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
      if (!response.ok) throw new Error("Failed to fetch movies")
      const data = await response.json()
      setMovies(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const searchMovies = async (query) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      )
      if (!response.ok) throw new Error("Failed to search movies")
      const data = await response.json()
      setMovies(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return {
    movies,
    loading,
    error,
    searchMovies,
    fetchTrending,
  }
}
