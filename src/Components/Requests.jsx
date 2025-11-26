import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, X, BookOpen, Sparkles, UserCheck, Inbox, AlertCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import PulsatingDots from "./PulsatingDots";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const reviewRequest = async (status, _id) => {
    setProcessingId(_id);
    setError("");
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
      setError("Failed to process request. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <PulsatingDots />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-20"
        >
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-base-200 rounded-full">
              <Inbox className="h-20 w-20 text-base-content/30" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">All Caught Up!</h1>
          <p className="text-base-content/60 mb-6">
            No pending connection requests at the moment.
          </p>
          <p className="text-sm text-base-content/40">
            Check back later for new requests from book lovers
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Connection Requests</h1>
        </div>
        <p className="text-base-content/60">
          {requests.length} pending request{requests.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="alert alert-error mb-6"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requests List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {requests.map((request, index) => {
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
            } = request.fromUserId;

            const isProcessing = processingId === request._id;

            return (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-300">
                  {/* Animated gradient border */}
                  <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Profile Section */}
                      <div className="flex gap-4 flex-1">
                        <motion.div
                          className="avatar"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-24 h-24 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                            <img
                              src={photoUrl}
                              alt={`${firstName} ${lastName}`}
                            />
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h2 className="text-2xl font-bold">
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
                            <p className="text-sm text-base-content/70 mb-2 flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {age}, {gender}
                            </p>
                          )}

                          {about && (
                            <p className="text-base-content/80 mb-4">{about}</p>
                          )}

                          {/* Favorite Genres */}
                          {favoriteGenres.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Favorite Genres
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {favoriteGenres.map((genre, idx) => (
                                  <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="badge badge-outline"
                                  >
                                    {genre}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Favorite Books */}
                          {favoriteBooks.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-primary" />
                                Favorite Books
                              </p>
                              <div className="space-y-2">
                                {favoriteBooks.slice(0, 3).map((book, idx) => (
                                  <motion.div
                                    key={book._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-base-300/50 p-3 rounded-lg border border-primary/10"
                                  >
                                    <p className="font-medium text-sm">{book.title}</p>
                                    {book.author && (
                                      <p className="text-xs text-base-content/60">
                                        by {book.author}
                                      </p>
                                    )}
                                  </motion.div>
                                ))}
                                {favoriteBooks.length > 3 && (
                                  <p className="text-xs text-base-content/60 pl-3">
                                    +{favoriteBooks.length - 3} more books
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-3 justify-center lg:justify-start lg:min-w-[140px]">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-error flex-1 lg:flex-none gap-2"
                          onClick={() => reviewRequest("rejected", request._id)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <>
                              <X className="h-4 w-4" />
                              Reject
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-success flex-1 lg:flex-none gap-2"
                          onClick={() => reviewRequest("accepted", request._id)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Accept
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
    </div>
  );
};

export default Requests;
