import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MessageCircle, BookOpen, Sparkles, Search, Filter, UserCheck } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Get all unique genres from connections
  const allGenres = connections
    ? [...new Set(connections.flatMap(c => c.favoriteGenres || []))].sort()
    : [];

  // Filter connections based on search and genre
  const filteredConnections = connections?.filter(connection => {
    const matchesSearch = searchQuery === "" || 
      `${connection.firstName} ${connection.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = filterGenre === "" || 
      connection.favoriteGenres?.includes(filterGenre);
    
    return matchesSearch && matchesGenre;
  }) || [];

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-20"
        >
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-base-200 rounded-full">
              <Users className="h-20 w-20 text-base-content/30" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">No Connections Yet</h1>
          <p className="text-base-content/60 mb-6">
            Start connecting with book lovers in the feed!
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Explore Feed
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">My Connections</h1>
        </div>
        <p className="text-base-content/60">
          {filteredConnections.length} of {connections.length} connection{connections.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden">
          <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    Search Connections
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input input-bordered focus:input-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Genre Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    Filter by Genre
                  </span>
                </label>
                <select
                  className="select select-bordered focus:select-primary transition-all"
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                >
                  <option value="">All Genres</option>
                  {allGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connections Grid */}
      <AnimatePresence mode="popLayout">
        {filteredConnections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-base-content/60">No connections match your filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection, index) => {
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
              } = connection;

              return (
                <motion.div
                  key={_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-300 h-full">
                    {/* Animated gradient border */}
                    <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
                    
                    <div className="p-6">
                      {/* Profile Section */}
                      <div className="flex gap-4 mb-4">
                        <motion.div 
                          className="avatar"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-20 h-20 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                            <img
                              src={photoUrl}
                              alt={`${firstName} ${lastName}`}
                            />
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h2 className="text-xl font-bold">
                              {firstName} {lastName}
                            </h2>
                            {favoriteBooks.length > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="badge badge-primary gap-1"
                              >
                                <BookOpen className="h-3 w-3" />
                                {favoriteBooks.length}
                              </motion.div>
                            )}
                          </div>
                          {age && gender && (
                            <p className="text-sm text-base-content/70 flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {age}, {gender}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* About */}
                      {about && (
                        <p className="text-sm text-base-content/80 mb-4 line-clamp-2">
                          {about}
                        </p>
                      )}

                      {/* Favorite Genres */}
                      {favoriteGenres.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-primary" />
                            Genres
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {favoriteGenres.slice(0, 3).map((genre, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="badge badge-outline badge-sm"
                              >
                                {genre}
                              </motion.span>
                            ))}
                            {favoriteGenres.length > 3 && (
                              <span className="badge badge-outline badge-sm">
                                +{favoriteGenres.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Favorite Books Preview */}
                      {favoriteBooks.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-primary" />
                            Recent Books
                          </p>
                          <div className="space-y-1">
                            {favoriteBooks.slice(0, 2).map((book, idx) => (
                              <motion.p
                                key={book._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="text-xs text-base-content/70 truncate flex items-center gap-1"
                              >
                                <span className="text-primary">•</span>
                                {book.title}
                              </motion.p>
                            ))}
                            {favoriteBooks.length > 2 && (
                              <p className="text-xs text-base-content/60">
                                +{favoriteBooks.length - 2} more
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Chat Button */}
                      <Link to={`/chat/${_id}`} className="block">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-primary w-full gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Start Chat
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

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
    </div>
  );
};

export default Connections;