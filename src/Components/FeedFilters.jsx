import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, BookOpen, Sparkles, ArrowUpDown } from "lucide-react";
import { VALID_GENRES } from "../utils/bookService";

const FeedFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [localBook, setLocalBook] = useState(filters.book || "");
  const [showFilters, setShowFilters] = useState(false);

  // Sync local search state with parent
  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  // Sync local book state with parent
  useEffect(() => {
    setLocalBook(filters.book || "");
  }, [filters.book]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ 
          search: localSearch, 
          genre: filters.genre,
          book: filters.book,
          sort: filters.sort,
          page: 1 
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, filters.genre, filters.book, filters.sort]);

  // Debounce book filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localBook !== filters.book) {
        onFiltersChange({ 
          search: filters.search,
          genre: filters.genre,
          book: localBook,
          sort: filters.sort,
          page: 1 
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localBook, filters.search, filters.genre, filters.sort]);

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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-6"
    >
      <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden">
        {/* Animated gradient border */}
        <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
        
        <div className="p-6">
          {/* Header with mobile toggle */}
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Filter className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Filter Your Feed</h3>
                <p className="text-sm text-base-content/60">Find your perfect book match</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="badge badge-primary gap-2"
                >
                  <Sparkles className="h-3 w-3" />
                  {activeFilterCount} active
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-ghost lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Search by name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Search by Name
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search users by first or last name..."
                      className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all duration-300"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40 pointer-events-none" />
                    {localSearch && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                        onClick={() => setLocalSearch("")}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Filters row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Genre filter */}
                  <motion.div 
                    className="form-control"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Genre
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full focus:select-primary transition-all duration-300"
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
                  </motion.div>

                  {/* Book filter */}
                  <motion.div 
                    className="form-control"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Book Title
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Filter by book title..."
                        className="input input-bordered w-full pr-10 focus:input-primary transition-all duration-300"
                        value={localBook}
                        onChange={(e) => setLocalBook(e.target.value)}
                      />
                      {localBook && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                          onClick={() => setLocalBook("")}
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Sort */}
                  <motion.div 
                    className="form-control"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-primary" />
                        Sort By
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full focus:select-primary transition-all duration-300"
                      value={filters.sort || ""}
                      onChange={handleSortChange}
                    >
                      <option value="">Default</option>
                      <option value="name">Alphabetical (A-Z)</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </motion.div>
                </div>

                {/* Active filters display */}
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 items-center pt-4 border-t border-primary/20"
                  >
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Active Filters:
                    </span>
                    {filters.search && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="badge badge-primary gap-2 py-3"
                      >
                        Search: {filters.search}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setLocalSearch("")}
                        >
                          <X className="h-3 w-3" />
                        </motion.button>
                      </motion.div>
                    )}
                    {filters.genre && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="badge badge-primary gap-2 py-3"
                      >
                        Genre: {filters.genre}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onFiltersChange({ ...filters, genre: "", page: 1 })}
                        >
                          <X className="h-3 w-3" />
                        </motion.button>
                      </motion.div>
                    )}
                    {filters.book && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="badge badge-primary gap-2 py-3"
                      >
                        Book: {filters.book}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setLocalBook("")}
                        >
                          <X className="h-3 w-3" />
                        </motion.button>
                      </motion.div>
                    )}
                    {filters.sort && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="badge badge-primary gap-2 py-3"
                      >
                        Sort: {filters.sort}
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onFiltersChange({ ...filters, sort: "", page: 1 })}
                        >
                          <X className="h-3 w-3" />
                        </motion.button>
                      </motion.div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-ghost btn-xs ml-auto"
                      onClick={handleClearAll}
                    >
                      Clear All
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-energy-flow {
          animation: energy-flow 4s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes energy-flow {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FeedFilters;
