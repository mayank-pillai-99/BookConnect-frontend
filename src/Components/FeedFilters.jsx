import { useState, useEffect } from "react";
import { VALID_GENRES } from "../utils/bookService";

const FeedFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [localBook, setLocalBook] = useState(filters.book || "");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ ...filters, search: localSearch, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch]);

  // Debounce book filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localBook !== filters.book) {
        onFiltersChange({ ...filters, book: localBook, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localBook]);

  const handleGenreChange = (e) => {
    onFiltersChange({ ...filters, genre: e.target.value, page: 1 });
  };

  const handleSortChange = (e) => {
    onFiltersChange({ ...filters, sort: e.target.value, page: 1 });
  };

  const handleClearAll = () => {
    setLocalSearch("");
    setLocalBook("");
    onClearFilters();
  };

  const activeFilterCount = [
    filters.search,
    filters.genre,
    filters.book,
    filters.sort
  ].filter(Boolean).length;

  return (
    <div className="card bg-base-200 shadow-lg mb-6">
      <div className="card-body p-4">
        {/* Mobile toggle button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide" : "Show"} Filters
            {activeFilterCount > 0 && (
              <span className="badge badge-primary ml-2">{activeFilterCount}</span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              className="btn btn-sm btn-ghost"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filters */}
        <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
          {/* Search by name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">🔍 Search by Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users by first or last name..."
                className="input input-bordered w-full pr-10"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              {localSearch && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                  onClick={() => setLocalSearch("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">🎭 Genre</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.genre || ""}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {VALID_GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Book filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">📖 Book Title</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by book title..."
                  className="input input-bordered w-full pr-10"
                  value={localBook}
                  onChange={(e) => setLocalBook(e.target.value)}
                />
                {localBook && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                    onClick={() => setLocalBook("")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">⬇️ Sort By</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.sort || ""}
                onChange={handleSortChange}
              >
                <option value="">Default</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Active filters display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 items-center pt-2">
              <span className="text-sm font-semibold">Active Filters:</span>
              {filters.search && (
                <div className="badge badge-primary gap-2">
                  Search: {filters.search}
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => setLocalSearch("")}
                  >
                    ✕
                  </button>
                </div>
              )}
              {filters.genre && (
                <div className="badge badge-primary gap-2">
                  Genre: {filters.genre}
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => onFiltersChange({ ...filters, genre: "", page: 1 })}
                  >
                    ✕
                  </button>
                </div>
              )}
              {filters.book && (
                <div className="badge badge-primary gap-2">
                  Book: {filters.book}
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => setLocalBook("")}
                  >
                    ✕
                  </button>
                </div>
              )}
              {filters.sort && (
                <div className="badge badge-primary gap-2">
                  Sort: {filters.sort}
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => onFiltersChange({ ...filters, sort: "", page: 1 })}
                  >
                    ✕
                  </button>
                </div>
              )}
              <button
                className="btn btn-ghost btn-xs ml-auto hidden lg:inline-flex"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;
