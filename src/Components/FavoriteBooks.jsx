import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, X, Check, AlertCircle, Sparkles, User2 } from "lucide-react";
import { addFavoriteBook, removeFavoriteBook } from "../utils/bookService";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const FavoriteBooks = ({ user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const favoriteBooks = Array.isArray(user?.favoriteBooks) ? user.favoriteBooks : [];

  if (!user) {
    return null;
  }

  const handleAddBook = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Book title is required");
      return;
    }

    const isDuplicate = favoriteBooks.some(
      book => book.title.toLowerCase() === title.toLowerCase()
    );
    
    if (isDuplicate) {
      setError("This book is already in your favorites");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await addFavoriteBook(title.trim(), author.trim());
      const userData = response.data || response;
      
      if (userData) {
        dispatch(addUser(userData));
        setSuccess("Book added successfully!");
        setTitle("");
        setAuthor("");
        setShowAddForm(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error adding book:", err);
      setError(err.response?.data?.message || err.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBook = async (bookId, bookTitle) => {
    if (!window.confirm(`Remove "${bookTitle}" from favorites?`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await removeFavoriteBook(bookId);
      const userData = response.data || response;
      
      if (userData) {
        dispatch(addUser(userData));
        setSuccess("Book removed successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error removing book:", err);
      setError(err.response?.data?.message || err.message || "Failed to remove book");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden">
        {/* Animated gradient border */}
        <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Favorite Books</h2>
                <p className="text-sm text-base-content/60">
                  {favoriteBooks.length} book{favoriteBooks.length !== 1 ? "s" : ""} in your collection
                </p>
              </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn ${showAddForm ? "btn-ghost" : "btn-primary"} btn-sm gap-2`}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Book
                </>
              )}
            </motion.button>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="alert alert-error mb-4"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="alert alert-success mb-4"
              >
                <Check className="h-5 w-5" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAddBook}
                className="mb-6 p-4 bg-base-300/50 rounded-xl border border-primary/10"
              >
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Book Title *
                      </span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      placeholder="Enter book title"
                      className="input input-bordered w-full focus:input-primary transition-all duration-300"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <User2 className="h-4 w-4 text-primary" />
                        Author
                      </span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      placeholder="Enter author name (optional)"
                      className="input input-bordered w-full focus:input-primary transition-all duration-300"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn btn-primary w-full gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add Book
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Books List */}
          <div className="space-y-3">
            {favoriteBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-base-300/50 rounded-full">
                    <BookOpen className="h-12 w-12 text-base-content/30" />
                  </div>
                </div>
                <p className="text-base-content/60 mb-2">No favorite books yet</p>
                <p className="text-sm text-base-content/40">Add your first book to get started!</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {favoriteBooks.map((book, index) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group flex items-center justify-between p-4 bg-base-300/50 rounded-xl border border-transparent hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        {book.author && (
                          <p className="text-sm text-base-content/70 flex items-center gap-1">
                            <User2 className="h-3 w-3" />
                            {book.author}
                          </p>
                        )}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-ghost btn-sm btn-circle text-error opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveBook(book._id, book.title)}
                      title="Remove book"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
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

export default FavoriteBooks;
