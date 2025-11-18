import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
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

  const loadFeed = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetchFeed(filters.page, 10, {
        search: filters.search,
        genre: filters.genre,
        book: filters.book,
        sort: filters.sort
      });
      dispatch(addFeed(response?.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load feed");
      console.error("Feed error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [filters]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.book) params.set("book", filters.book);
    if (filters.sort) params.set("sort", filters.sort);
    
    setSearchParams(params);
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      genre: "",
      book: "",
      sort: "",
      page: 1
    });
  };

  if (loading && !feed) {
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

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <PulsatingDots />
        </div>
      ) : feed && feed.length > 0 ? (
        <div className="flex justify-center">
          <UserCard user={feed[0]} showActions={true} />
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
