import { motion } from "framer-motion";
import { BookOpen, Users, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={`absolute ${className}`}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} border-2 border-white/10 backdrop-blur-[2px] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
                />
            </motion.div>
        </motion.div>
    );
}

const Landing = () => {
    const user = useSelector((store) => store.user);

    if (user) {
        return <Navigate to="/feed" replace />;
    }

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

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
            icon: Heart,
            title: "Build Connections",
            description: "Send and receive connection requests. Grow your network of fellow bibliophiles.",
        },
    ];

    return (
        <div className="min-h-screen bg-base-100 overflow-x-hidden font-sans">
            {/* Geometric Hero Section */}
            <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-base-100">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl opacity-30" />

                {/* Floating Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <ElegantShape
                        delay={0.3}
                        width={600}
                        height={140}
                        rotate={12}
                        gradient="from-primary/40"
                        className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
                    />

                    <ElegantShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-secondary/40"
                        className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
                    />

                    <ElegantShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-accent/40"
                        className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
                    />

                    <ElegantShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-warning/40"
                        className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
                    />

                    <ElegantShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-info/40"
                        className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Badge */}
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 border border-base-content/10 backdrop-blur-md mb-8 md:mb-12 shadow-sm"
                        >
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium tracking-wide text-base-content/80">
                                The #1 Social Network for Readers
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="mx-4 mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
                                <span className="bg-gradient-to-b from-base-content to-base-content/70 bg-clip-text text-transparent">
                                    Connect Through
                                </span>
                                <br />
                                <span
                                    className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent font-bold pb-4"
                                    style={{ fontFamily: "'Pacifico', cursive" }}
                                >
                                    Books
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="mx-auto mb-10 max-w-xl px-4 text-base leading-relaxed sm:text-lg md:text-xl text-base-content/60">
                                Discover your next favorite story, share your library, and build lasting connections with a community that loves reading as much as you do.
                            </p>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col justify-center gap-4 sm:flex-row"
                        >
                            <Link to="/login" state={{ isSignup: true }}>
                                <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </Link>
                            <Link to="/login" state={{ isSignup: false }}>
                                <button className="btn btn-outline btn-lg rounded-full px-8 border-base-content/20 hover:bg-base-content/5">
                                    Sign In
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Features Section */}
            <section className="relative py-32 px-4 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-base-100" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-200/20 to-base-100 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />

                {/* Decorative Blobs */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-base-content/60 max-w-2xl mx-auto leading-relaxed">
                            Powerful features designed to enhance your reading life and help you build meaningful connections.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group relative p-8 rounded-3xl bg-base-200/30 border border-base-content/5 hover:border-primary/20 hover:bg-base-200/50 transition-all duration-500 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="mb-6 inline-flex p-4 rounded-2xl bg-base-100 border border-base-content/5 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        <p className="text-base-content/60 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
