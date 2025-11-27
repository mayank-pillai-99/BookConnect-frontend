import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Menu, X, ArrowRight, BookOpen, User, Users, Mail, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      setIsMobileMenuOpen(false);
      return navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = user
    ? [
      { name: 'Feed', href: '/feed', icon: BookOpen },
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Connections', href: '/connections', icon: Users },
      { name: 'Requests', href: '/requests', icon: Mail },
    ]
    : [
      { name: 'Home', href: '/', icon: BookOpen },
    ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  const location = useLocation();

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-base-300/80 border-b border-base-content/10 shadow-lg backdrop-blur-md'
          : location.pathname === '/'
            ? 'bg-transparent'
            : 'bg-base-300'
          }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link to={user ? "/feed" : "/"} className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary-focus shadow-lg">
                    <BookOpen className="h-6 w-6 text-primary-content" />
                  </div>
                  {user && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-success"></div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-base-content text-xl font-bold">
                    BookConnect
                  </span>
                  <span className="text-base-content/60 -mt-1 text-xs">
                    Connect through books
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            {user && (
              <nav className="hidden items-center space-x-1 lg:flex">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link
                        to={item.href}
                        className="text-base-content/80 hover:text-base-content relative flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                      >
                        {hoveredItem === item.name && (
                          <motion.div
                            className="bg-base-100 absolute inset-0 rounded-lg"
                            layoutId="navbar-hover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        <Icon className="h-4 w-4 relative z-10" />
                        <span className="relative z-10">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            )}

            {/* Desktop User Menu */}
            <motion.div
              className="hidden items-center space-x-3 lg:flex"
              variants={itemVariants}
            >
              {user ? (
                <>
                  <div className="text-base-content/80 px-3 py-2 text-sm font-medium">
                    Welcome, {user.firstName}
                  </div>
                  <Link to="/profile">
                    <motion.div
                      className="btn btn-ghost btn-circle avatar"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                        <img alt={user.firstName} src={user.photoUrl} />
                      </div>
                    </motion.div>
                  </Link>
                  <motion.button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-4 w-4" />
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    state={{ isSignup: false }}
                    className="text-base-content/80 hover:text-base-content px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      state={{ isSignup: true }}
                      className="btn btn-primary btn-sm inline-flex items-center space-x-2 shadow-lg"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="bg-base-100 fixed top-16 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-base-content/10 shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                {user ? (
                  <>
                    {/* User Info */}
                    <motion.div
                      className="flex items-center space-x-3 pb-4 border-b border-base-content/10"
                      variants={mobileItemVariants}
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full ring-2 ring-primary">
                          <img src={user.photoUrl} alt={user.firstName} />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-base-content">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-base-content/60">
                          {user.emailId}
                        </p>
                      </div>
                    </motion.div>

                    {/* Navigation Items */}
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.div key={item.name} variants={mobileItemVariants}>
                            <Link
                              to={item.href}
                              className="hover:bg-base-200 flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Icon className="h-5 w-5" />
                              <span>{item.name}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Logout Button */}
                    <motion.div
                      className="border-t border-base-content/10 pt-4"
                      variants={mobileItemVariants}
                    >
                      <button
                        onClick={handleLogout}
                        className="btn btn-error btn-outline w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    className="space-y-3"
                    variants={mobileItemVariants}
                  >
                    <Link
                      to="/login"
                      state={{ isSignup: false }}
                      className="btn btn-ghost w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/login"
                      state={{ isSignup: true }}
                      className="btn btn-primary w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
