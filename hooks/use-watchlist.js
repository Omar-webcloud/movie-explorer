"use client"

import { useState, useEffect } from "react"

const WATCHLIST_KEY = "kino-xplorer-watchlist"

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY)
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored))
      } catch (err) {
        console.error("[v0] Failed to parse watchlist:", err)
      }
    }
  }, [])

  const saveWatchlist = (newWatchlist) => {
    setWatchlist(newWatchlist)
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist))
  }

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      saveWatchlist([...watchlist, movie])
    }
  }

  const removeFromWatchlist = (movieId) => {
    saveWatchlist(watchlist.filter((m) => m.id !== movieId))
  }

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId)
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  }
}
