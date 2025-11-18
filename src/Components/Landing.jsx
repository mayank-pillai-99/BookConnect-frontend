import { motion } from "framer-motion";
import { BookOpen, Users, MessageCircle, Sparkles, Heart, TrendingUp, ArrowRight, Check } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((store) => store.user);

  // If user is logged in, redirect to feed
  if (user) {
    return <Navigate to="/feed" replace />;
  }
  const features = [
    {
      icon: Users,
      title: "Find Your Reading Tribe",
      description: "Connect with book lovers who share your literary tastes and discover new reading buddies.",
    },
    {
      icon: BookOpen,
      title: "Share Your Library",
      description: "Showcase your favorite books and genres. Let others discover what makes you unique.",
    },
    {
      icon: MessageCircle,
      title: "Chat & Discuss",
      description: "Real-time messaging to discuss plot twists, share recommendations, and plan book clubs.",
    },
    {
      icon: Sparkles,
      title: "Smart Matching",
      description: "Our algorithm connects you with readers who love the same genres and authors.",
    },
    {
      icon: Heart,
      title: "Build Connections",
      description: "Send and receive connection requests. Grow your network of fellow bibliophiles.",
    },
    {
      icon: TrendingUp,
      title: "Discover Trends",
      description: "See what books are popular in your network and explore new genres together.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Sign up and add your favorite books and genres to your profile.",
    },
    {
      step: "2",
      title: "Discover Readers",
      description: "Browse through profiles and find people with similar reading interests.",
    },
    {
      step: "3",
      title: "Connect & Chat",
      description: "Send connection requests and start conversations about your favorite books.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Blurred Photo Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')",
              filter: "blur(8px)",
              transform: "scale(1.1)",
            }}
          ></div>
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-base-300/90 via-base-300/85 to-base-300/90"></div>
          {/* Additional gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-300/50"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="p-4 bg-primary/20 rounded-full">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              BookConnect
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold mb-4 text-base-content">
              Where Book Lovers Meet
            </p>
            
            <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
              Connect with fellow readers, share your favorite books, and discover your next great read through meaningful conversations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" state={{ isSignup: true }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg gap-2 shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <Link to="/login" state={{ isSignup: false }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-lg"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>

            <p className="text-sm text-base-content/50 mt-6">
              Join thousands of book lovers already connecting
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Connect
            </h2>
            <p className="text-lg text-base-content/70">
              Powerful features designed for book lovers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-base-200/80 backdrop-blur-md rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg"
                >
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-base-content/70">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-base-200/80 backdrop-blur-md rounded-2xl p-8 border border-primary/20 text-center h-full">
                  <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-base-content/70">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Reading Community?
            </h2>
            <p className="text-xl text-base-content/70 mb-8">
              Join BookConnect today and start connecting with book lovers around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-base-content/80">
                <Check className="h-5 w-5 text-success" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/80">
                <Check className="h-5 w-5 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/80">
                <Check className="h-5 w-5 text-success" />
                <span>Connect instantly</span>
              </div>
            </div>

            <Link to="/login" state={{ isSignup: true }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg gap-2 shadow-xl"
              >
                Start Connecting Now
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
