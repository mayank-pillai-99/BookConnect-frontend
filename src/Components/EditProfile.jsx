import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Image, Calendar, MapPin, FileText, Save, CheckCircle, AlertCircle } from "lucide-react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: "First Name", value: firstName, setter: setFirstName, icon: User, type: "text" },
    { label: "Last Name", value: lastName, setter: setLastName, icon: User, type: "text" },
    { label: "Photo URL", value: photoUrl, setter: setPhotoUrl, icon: Image, type: "text" },
    { label: "Age", value: age, setter: setAge, icon: Calendar, type: "number" },
    { label: "Gender", value: gender, setter: setGender, icon: MapPin, type: "text" },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Edit Your Profile
          </h1>
          <p className="text-base-content/60">Update your information and see the preview in real-time</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-base-200/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 overflow-hidden">
              {/* Animated gradient border */}
              <div className="animate-energy-flow via-primary h-1 w-full bg-gradient-to-r from-transparent to-transparent" />
              
              <div className="p-6 space-y-6">
                {/* Input Fields */}
                {inputFields.map((field, index) => {
                  const Icon = field.icon;
                  return (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="form-control"
                    >
                      <label className="label">
                        <span className="label-text font-semibold flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          {field.label}
                        </span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type={field.type}
                        value={field.value}
                        className="input input-bordered w-full focus:input-primary transition-all duration-300"
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </motion.div>
                  );
                })}

                {/* About Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="form-control"
                >
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      About
                    </span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    value={about}
                    className="textarea textarea-bordered w-full h-32 focus:textarea-primary transition-all duration-300"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself and your favorite books..."
                    rows="4"
                  />
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="alert alert-error"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary w-full gap-2 shadow-lg"
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Save Profile
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="mb-4 ml-20">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Live Preview
              </h3>
              <p className="text-sm text-base-content/60">See how your profile looks to others</p>
            </div>
            <div className="flex-1 flex items-start justify-center">
              <UserCard
                user={{ 
                  firstName, 
                  lastName, 
                  photoUrl, 
                  age, 
                  gender, 
                  about,
                  favoriteBooks: user.favoriteBooks || [],
                  favoriteGenres: user.favoriteGenres || []
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="toast toast-top toast-center z-50"
          >
            <div className="alert alert-success shadow-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Profile saved successfully!</span>
            </div>
          </motion.div>
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
    </>
  );
};

export default EditProfile;
