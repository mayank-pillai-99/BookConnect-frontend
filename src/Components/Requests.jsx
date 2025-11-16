import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
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

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold mb-4">No Connection Requests</h1>
        <p className="text-base-content/60">
          You're all caught up! Check back later for new requests.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Connection Requests ({requests.length})
      </h1>

      <div className="space-y-4">
        {requests.map((request) => {
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

          return (
            <div
              key={_id}
              className="card bg-base-300 shadow-xl hover:shadow-2xl transition"
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Profile Image */}
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full">
                      <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="card-title text-2xl">
                        {firstName} {lastName}
                      </h2>
                      {favoriteBooks.length > 0 && (
                        <span className="badge badge-primary">
                          {favoriteBooks.length} 📚
                        </span>
                      )}
                    </div>
                    
                    {age && gender && (
                      <p className="text-sm text-base-content/70 mb-2">
                        {age}, {gender}
                      </p>
                    )}
                    
                    {about && <p className="mb-3">{about}</p>}

                    {/* Favorite Genres */}
                    {favoriteGenres.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold mb-1">🎭 Genres:</p>
                        <div className="flex flex-wrap gap-2">
                          {favoriteGenres.map((genre, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Favorite Books */}
                    {favoriteBooks.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">
                          📚 Favorite Books:
                        </p>
                        <div className="space-y-1">
                          {favoriteBooks.slice(0, 3).map((book) => (
                            <div key={book._id} className="text-sm bg-base-200 p-2 rounded">
                              <p className="font-medium">{book.title}</p>
                              {book.author && (
                                <p className="text-xs text-base-content/60">
                                  by {book.author}
                                </p>
                              )}
                            </div>
                          ))}
                          {favoriteBooks.length > 3 && (
                            <p className="text-xs text-base-content/60">
                              +{favoriteBooks.length - 3} more books
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-2 justify-center">
                    <button
                      className="btn btn-error btn-sm md:btn-md"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      ✕ Reject
                    </button>
                    <button
                      className="btn btn-success btn-sm md:btn-md"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      ✓ Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
