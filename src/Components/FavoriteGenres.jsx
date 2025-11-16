import { useState, useEffect } from "react";
import { updateFavoriteGenres, VALID_GENRES } from "../utils/bookService";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const FavoriteGenres = ({ user }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.favoriteGenres && Array.isArray(user.favoriteGenres)) {
      setSelectedGenres(user.favoriteGenres);
    } else {
      setSelectedGenres([]);
    }
  }, [user]);

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await updateFavoriteGenres(selectedGenres);
      console.log("Genre update response:", response);
      
      // The response.data might already be the user object, or it might be nested
      const userData = response.data?.data || response.data;
      
      if (userData) {
        dispatch(addUser(userData));
        setSuccess("Genres updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error updating genres:", err);
      setError(err.response?.data?.message || err.message || "Failed to update genres");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    try {
      const current = [...selectedGenres].sort();
      const original = [...(user?.favoriteGenres || [])].sort();
      return JSON.stringify(current) !== JSON.stringify(original);
    } catch (err) {
      console.error("Error comparing genres:", err);
      return false;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="card bg-base-200 shadow-xl p-6">
      <h2 className="card-title text-2xl mb-4">🎭 Favorite Genres</h2>

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {VALID_GENRES.map((genre) => (
          <label
            key={genre}
            className={`
              cursor-pointer p-3 rounded-lg border-2 transition-all
              ${
                selectedGenres.includes(genre)
                  ? "border-primary bg-primary/20 font-semibold"
                  : "border-base-300 hover:border-primary/50"
              }
            `}
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm mr-2"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreToggle(genre)}
              disabled={loading}
            />
            <span className="text-sm">{genre}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-base-content/60">
          {selectedGenres.length} genre{selectedGenres.length !== 1 ? "s" : ""} selected
        </div>
        
        {hasChanges() && (
          <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FavoriteGenres;
