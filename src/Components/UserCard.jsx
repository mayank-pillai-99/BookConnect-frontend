import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { X, Heart, BookOpen, Sparkles, MapPin, Calendar, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = false }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    favoriteBooks = [],
    favoriteGenres = []
  } = user;

  const dispatch = useDispatch();
  const [exitX, setExitX] = useState(0);
  const [exitOpacity, setExitOpacity] = useState(1);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      // Swipe threshold reached
      setExitX(info.offset.x > 0 ? 1000 : -1000);
      setExitOpacity(0);

      // Send request based on swipe direction
      const status = info.offset.x > 0 ? "interested" : "ignored";
      setTimeout(() => {
        handleSendRequest(status, _id);
      }, 300);
    }
  };

  const handleButtonClick = (status) => {
    const direction = status === "interested" ? 1000 : -1000;
    setExitX(direction);
    setExitOpacity(0);

    setTimeout(() => {
      handleSendRequest(status, _id);
    }, 300);
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      style={showActions ? { x, rotate, opacity } : {}}
      drag={showActions ? "x" : false}
      dragConstraints={showActions ? { left: 0, right: 0 } : undefined}
      onDragEnd={showActions ? handleDragEnd : undefined}
      animate={showActions ? { x: exitX, opacity: exitOpacity } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Swipe indicators - only show when actions are enabled */}
      {showActions && (
        <>
          <motion.div
            className="absolute top-8 left-8 z-10 bg-error/90 text-error-content px-6 py-3 rounded-xl font-bold text-2xl rotate-[-20deg] border-4 border-error"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <X className="inline h-8 w-8" /> NOPE
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 z-10 bg-success/90 text-success-content px-6 py-3 rounded-xl font-bold text-2xl rotate-[20deg] border-4 border-success"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <Heart className="inline h-8 w-8" /> LIKE
          </motion.div>
        </>
      )}

      {/* Card */}
      <div className="card bg-base-200/80 backdrop-blur-md shadow-2xl border border-primary/20 overflow-hidden">
        {/* Animated gradient border */}
        <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />

        {/* Image section */}
        <figure className="relative h-96 overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent" />

          {/* Floating badge */}
          {(favoriteBooks.length > 0 || favoriteGenres.length > 0) && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-content px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              {favoriteBooks.length} Books
            </motion.div>
          )}
        </figure>

        <div className="card-body p-6">
          {/* Name and basic info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="card-title text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {firstName} {lastName}
              </h2>
              {age && (
                <div className="badge badge-lg badge-outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  {age}
                </div>
              )}
            </div>

            {gender && (
              <p className="text-sm text-base-content/70 flex items-center gap-2">
                <User className="h-4 w-4" />
                {gender}
              </p>
            )}
          </motion.div>

          {/* About */}
          {about && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-base-content/80 leading-relaxed"
            >
              {about}
            </motion.p>
          )}

          {/* Favorite Genres */}
          {favoriteGenres.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Favorite Genres
              </p>
              <div className="flex flex-wrap gap-2">
                {favoriteGenres.map((genre, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="badge badge-primary badge-lg gap-2"
                  >
                    {genre}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Favorite Books */}
          {favoriteBooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                {firstName}'s Favorite Books
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {favoriteBooks.slice(0, 5).map((book, index) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-base-300/50 backdrop-blur-sm p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <p className="font-medium text-base-content">{book.title}</p>
                    {book.author && (
                      <p className="text-xs text-base-content/60 mt-1">by {book.author}</p>
                    )}
                  </motion.div>
                ))}
                {favoriteBooks.length > 5 && (
                  <p className="text-xs text-base-content/60 text-center py-2">
                    +{favoriteBooks.length - 5} more books
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action buttons - only show when actions are enabled */}
          {showActions && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-actions justify-center mt-6 gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-error flex-1 gap-2 group"
                  onClick={() => handleButtonClick("ignored")}
                >
                  <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  Ignore
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary flex-1 gap-2 group shadow-lg"
                  onClick={() => handleButtonClick("interested")}
                >
                  <Heart className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                  Interested
                </motion.button>
              </motion.div>

              {/* Swipe hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-xs text-base-content/40 mt-4"
              >
                💡 Swipe left to ignore, right to like
              </motion.p>
            </>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
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

export default UserCard;
