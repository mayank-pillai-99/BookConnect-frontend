import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import EditProfile from "./EditProfile";
import FavoriteBooks from "./FavoriteBooks";
import FavoriteGenres from "./FavoriteGenres";
import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(BASE_URL + "/profile/delete", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Error deleting user:", err);
      // You might want to show a toast error here
    }
  };

  return (
    user && (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <EditProfile user={user} />
          <FavoriteBooks user={user} />
          <FavoriteGenres user={user} />

          {/* Delete Account Section */}
          <div className="card bg-base-200 shadow-xl border border-error/20">
            <div className="card-body">
              <h2 className="card-title text-error flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </h2>
              <p className="text-base-content/70">
                Permanently delete your account and all of your content. This action is irreversible.
              </p>
              <div className="card-actions justify-end mt-4">
                {!showDeleteConfirm ? (
                  <button
                    className="btn btn-error btn-outline"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="flex items-center gap-4 bg-error/10 p-4 rounded-lg border border-error/20 w-full justify-between animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-3 text-error">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Are you sure? This cannot be undone.</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={handleDeleteUser}
                      >
                        Yes, Delete My Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Profile;
