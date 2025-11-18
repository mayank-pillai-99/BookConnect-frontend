import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Save, Check, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden">
        {/* Animated gradient border */}
        <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
        
        <div className="p-6">
          {/* Header */}
          <motion.div 
            className="flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Favorite Genres</h2>
              <p className="text-sm text-base-content/60">
                {selectedGenres.length} genre{selectedGenres.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          </motion.div>

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

          {/* Genre Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {VALID_GENRES.map((genre, index) => {
              const isSelected = selectedGenres.includes(genre);
              return (
                <motion.label
                  key={genre}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    cursor-pointer p-4 rounded-xl border-2 transition-all duration-300
                    ${
                      isSelected
                        ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                        : "border-base-300 hover:border-primary/50 bg-base-300/30"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div className={`
                      w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                      ${isSelected ? "border-primary bg-primary" : "border-base-content/30"}
                    `}>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary-content" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleGenreToggle(genre)}
                      disabled={loading}
                    />
                    <span className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}>
                      {genre}
                    </span>
                  </div>
                </motion.label>
              );
            })}
          </div>

          {/* Save Button */}
          <AnimatePresence>
            {hasChanges() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/30"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm font-medium">You have unsaved changes</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary gap-2"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </motion.button>
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

export default FavoriteGenres;
