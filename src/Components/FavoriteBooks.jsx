import { useState } from "react";
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

    // Check for duplicates
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
      console.log("Add book response:", response);
      
      // The response might be nested as response.data or just response
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
      console.log("Remove book response:", response);
      
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
    <div className="card bg-base-200 shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title text-2xl">📚 Favorite Books</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "+ Add Book"}
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleAddBook} className="mb-6 p-4 bg-base-300 rounded-lg">
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Book Title *</span>
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              placeholder="Enter author name (optional)"
              className="input input-bordered w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {favoriteBooks.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            <p>No favorite books yet. Add your first book!</p>
          </div>
        ) : (
          favoriteBooks.map((book) => (
            <div
              key={book._id}
              className="flex items-center justify-between p-4 bg-base-300 rounded-lg hover:bg-base-100 transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                {book.author && (
                  <p className="text-sm text-base-content/70">by {book.author}</p>
                )}
              </div>
              <button
                className="btn btn-ghost btn-sm btn-circle text-error"
                onClick={() => handleRemoveBook(book._id, book.title)}
                title="Remove book"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {favoriteBooks.length > 0 && (
        <div className="mt-4 text-sm text-base-content/60 text-center">
          {favoriteBooks.length} book{favoriteBooks.length !== 1 ? "s" : ""} in your collection
        </div>
      )}
    </div>
  );
};

export default FavoriteBooks;
