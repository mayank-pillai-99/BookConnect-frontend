import { useDispatch, useSelector } from "react-redux";
import { addFeed, clearFeed } from "../utils/feedSlice";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";
import FeedFilters from "./FeedFilters";
import PulsatingDots from "./PulsatingDots";
import { getFeed as fetchFeed } from "../utils/bookService";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    genre: searchParams.get("genre") || "",
    book: searchParams.get("book") || "",
    sort: searchParams.get("sort") || "",
    page: 1
  });

  const loadingRef = useRef(false);
  const prevFilterKeyRef = useRef(null);

  // Load feed function
  const loadFeed = useCallback(async (page, search, genre, book, sort) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError("");
    
    try {
      const response = await fetchFeed(page, 10, { search, genre, book, sort });
      const data = response?.data || response || [];
      dispatch(addFeed(Array.isArray(data) ? data : []));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load feed");
      console.error("Feed error:", err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [dispatch]);

  // Load initial feed
  useEffect(() => {
    loadFeed(1, filters.search, filters.genre, filters.book, filters.sort);
  }, [loadFeed]);

  // Reload when filters change
  useEffect(() => {
    const filterKey = `${filters.search}|${filters.genre}|${filters.book}|${filters.sort}`;
    
    if (filterKey !== prevFilterKeyRef.current) {
      prevFilterKeyRef.current = filterKey;
      dispatch(clearFeed());
      loadFeed(1, filters.search, filters.genre, filters.book, filters.sort);
    }
  }, [filters.search, filters.genre, filters.book, filters.sort, dispatch, loadFeed]);

  // Auto-load next page when feed is low
  useEffect(() => {
    if (feed && feed.length > 0 && feed.length <= 2 && !loading) {
      console.log("Feed running low, loading next page");
      loadFeed(filters.page + 1, filters.search, filters.genre, filters.book, filters.sort);
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [feed, loading, filters, loadFeed]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.book) params.set("book", filters.book);
    if (filters.sort) params.set("sort", filters.sort);
    setSearchParams(params);
  }, [filters.search, filters.genre, filters.book, filters.sort, setSearchParams]);

  const handleFiltersChange = (newFilters) => {
    dispatch(clearFeed());
    setFilters({
      ...newFilters,
      page: 1
    });
  };

  const handleClearFilters = () => {
    dispatch(clearFeed());
    prevFilterKeyRef.current = null;
    setFilters({
      search: "",
      genre: "",
      book: "",
      sort: "",
      page: 1
    });
  };

  if (loading && (!feed || feed.length === 0)) {
    return (
      <div className="flex justify-center items-center my-20">
        <PulsatingDots />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FeedFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {feed && feed.length > 0 ? (
        <div className="flex justify-center">
          <UserCard key={feed[0]._id} user={feed[0]} showActions={true} />
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">No users found</h2>
          <p className="text-base-content/60 mb-6">
            {filters.search || filters.genre || filters.book
              ? "Try adjusting your filters to see more results"
              : "Check back later for new connections!"}
          </p>
          {(filters.search || filters.genre || filters.book || filters.sort) && (
            <button
              className="btn btn-primary"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
