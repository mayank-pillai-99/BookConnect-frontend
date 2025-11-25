import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import PulsatingDots from "./PulsatingDots";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, BookOpen, Book, Library, Feather, Scroll } from "lucide-react";

const FloatingIcons = () => {
  const icons = [
    { Icon: Book, delay: 0, x: "10%", y: "20%" },
    { Icon: BookOpen, delay: 2, x: "80%", y: "15%" },
    { Icon: Library, delay: 4, x: "15%", y: "70%" },
    { Icon: Feather, delay: 1, x: "85%", y: "65%" },
    { Icon: Scroll, delay: 3, x: "50%", y: "85%" },
    { Icon: Book, delay: 5, x: "5%", y: "40%" },
    { Icon: BookOpen, delay: 1.5, x: "90%", y: "30%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        >
          <Icon size={48 + Math.random() * 32} />
        </motion.div>
      ))}
    </div>
  );
};

const Login = () => {
  const location = useLocation();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(
    location.state?.isSignup === true ? false : true
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/feed", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center py-10 px-4 relative overflow-hidden">
      {/* Floating Background Icons */}
      <FloatingIcons />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Glass Card */}
        <div className="bg-base-200/80 backdrop-blur-md rounded-3xl shadow-2xl border border-primary/20 overflow-hidden relative z-10">
          {/* Animated Gradient Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-energy-flow" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <BookOpen className="w-8 h-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">
                {isLoginForm ? "Welcome Back!" : "Start Your Journey"}
              </h2>
              <p className="text-base-content/60">
                {isLoginForm
                  ? "Continue your reading adventure"
                  : "Join our community of book lovers"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!isLoginForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">First Name</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                          placeholder="John"
                        />
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Last Name</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                          placeholder="Doe"
                        />
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                    placeholder="you@example.com"
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="alert alert-error text-sm py-2"
                  >
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full mt-6"
                onClick={isLoginForm ? handleLogin : handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <PulsatingDots />
                ) : (
                  <span className="flex items-center gap-2">
                    {isLoginForm ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>

              <div className="text-center mt-6">
                <p className="text-sm text-base-content/60">
                  {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    className="link link-primary font-semibold no-underline hover:underline"
                    onClick={() => setIsLoginForm(!isLoginForm)}
                  >
                    {isLoginForm ? "Sign up now" : "Sign in here"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Quote Footer */}
          <div className="bg-base-300/50 p-4 text-center border-t border-base-content/5">
            <p className="text-xs italic text-base-content/50 font-serif">
              "A room without books is like a body without a soul."
            </p>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] -z-10 rounded-full" />
      </motion.div>

      <style jsx>{`
        .animate-energy-flow {
          background-size: 200% 100%;
          animation: energy-flow 3s linear infinite;
        }
        @keyframes energy-flow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
};

export default Login;
