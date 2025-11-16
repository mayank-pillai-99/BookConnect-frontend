import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import FavoriteBooks from "./FavoriteBooks";
import FavoriteGenres from "./FavoriteGenres";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <EditProfile user={user} />
          <FavoriteBooks user={user} />
          <FavoriteGenres user={user} />
        </div>
      </div>
    )
  );
};
export default Profile;
