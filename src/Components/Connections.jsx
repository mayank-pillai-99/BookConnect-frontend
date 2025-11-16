import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  
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

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold mb-4">No Connections Yet</h1>
        <p className="text-base-content/60">
          Start connecting with book lovers in the feed!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Connections ({connections.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => {
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
            <div
              key={_id}
              className="card bg-base-300 shadow-xl hover:shadow-2xl transition"
            >
              <div className="card-body">
                <div className="flex gap-4">
                  {/* Profile Image */}
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="card-title">
                        {firstName} {lastName}
                      </h2>
                      {favoriteBooks.length > 0 && (
                        <span className="badge badge-primary badge-sm">
                          {favoriteBooks.length} 📚
                        </span>
                      )}
                    </div>
                    {age && gender && (
                      <p className="text-sm text-base-content/70">
                        {age}, {gender}
                      </p>
                    )}
                    {about && (
                      <p className="text-sm mt-2 line-clamp-2">{about}</p>
                    )}
                  </div>
                </div>

                {/* Favorite Genres */}
                {favoriteGenres.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold mb-1">Genres:</p>
                    <div className="flex flex-wrap gap-1">
                      {favoriteGenres.slice(0, 4).map((genre, index) => (
                        <span key={index} className="badge badge-outline badge-xs">
                          {genre}
                        </span>
                      ))}
                      {favoriteGenres.length > 4 && (
                        <span className="badge badge-outline badge-xs">
                          +{favoriteGenres.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Favorite Books Preview */}
                {favoriteBooks.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold mb-1">Recent Books:</p>
                    <div className="space-y-1">
                      {favoriteBooks.slice(0, 2).map((book) => (
                        <p key={book._id} className="text-xs text-base-content/70 truncate">
                          📖 {book.title}
                        </p>
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
                <div className="card-actions justify-end mt-4">
                  <Link to={`/chat/${_id}`}>
                    <button className="btn btn-primary btn-sm">
                      💬 Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;