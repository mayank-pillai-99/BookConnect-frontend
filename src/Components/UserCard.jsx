import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
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

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-md shadow-xl">
      <figure className="h-64 overflow-hidden">
        <img 
          src={photoUrl} 
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        {/* Name and basic info */}
        <div className="flex items-center justify-between">
          <h2 className="card-title text-2xl">{firstName} {lastName}</h2>
          {(favoriteBooks.length > 0 || favoriteGenres.length > 0) && (
            <div className="badge badge-primary">
              {favoriteBooks.length > 0 && `${favoriteBooks.length} 📚`}
            </div>
          )}
        </div>
        
        {age && gender && (
          <p className="text-sm text-base-content/70">{age}, {gender}</p>
        )}
        
        {/* About */}
        {about && <p className="mt-2">{about}</p>}

        {/* Favorite Genres */}
        {favoriteGenres.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">🎭 Favorite Genres:</p>
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
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">
              📚 {firstName}'s Favorite Books:
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {favoriteBooks.slice(0, 5).map((book) => (
                <div key={book._id} className="text-sm bg-base-200 p-2 rounded">
                  <p className="font-medium">{book.title}</p>
                  {book.author && (
                    <p className="text-xs text-base-content/60">by {book.author}</p>
                  )}
                </div>
              ))}
              {favoriteBooks.length > 5 && (
                <p className="text-xs text-base-content/60 text-center">
                  +{favoriteBooks.length - 5} more books
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="card-actions justify-center mt-6 gap-4">
          <button
            className="btn btn-outline btn-error flex-1"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ✕ Ignore
          </button>
          <button
            className="btn btn-primary flex-1"
            onClick={() => handleSendRequest("interested", _id)}
          >
            ❤️ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
