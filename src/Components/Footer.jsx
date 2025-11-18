import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Twitter,
  ArrowDownLeft,
  MessageCircle,
  BookOpen,
} from 'lucide-react';

const Footer = () => {

  const navigation = {
    explore: [
      { name: 'Feed', href: '/' },
      { name: 'Profile', href: '/profile' },
      { name: 'Connections', href: '/connections' },
      { name: 'Requests', href: '/requests' },
    ],
    resources: [
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Book Clubs', href: '#clubs' },
      { name: 'Reading Lists', href: '#lists' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  const bottomLinks = [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
    { href: '#cookies', label: 'Cookie Policy' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full">
      <div className="animate-energy-flow via-primary h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      <div className="relative w-full px-5">
        {/* Top Section */}
        <div className="container m-auto grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary-focus shadow-lg">
                <BookOpen className="h-6 w-6 text-primary-content" />
              </div>
              <span className="text-xl font-semibold">BookConnect</span>
            </Link>
            <p className="text-base-content/60 max-w-md">
              Connect with fellow book lovers, share your reading journey, and
              discover your next favorite book together.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="btn btn-outline btn-sm btn-circle hover:btn-primary cursor-pointer shadow-none transition-all duration-500 hover:scale-110 hover:-rotate-12"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <h1 className="from-base-content/15 bg-gradient-to-b bg-clip-text text-5xl font-extrabold text-transparent lg:text-7xl">
              Readers
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="grid w-full grid-cols-2 items-start gap-12 lg:col-span-3 pl-8">
            {['explore', 'resources'].map((section) => (
              <div key={section} className="w-full">
                <h3 className="border-primary mb-4 border-l-2 pl-5 text-sm font-semibold tracking-wider uppercase">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {navigation[section].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="group text-base-content/60 hover:text-base-content decoration-primary inline-flex items-center gap-2 underline-offset-8 transition-all duration-500 hover:pl-5 hover:underline"
                      >
                        <ArrowDownLeft className="text-primary rotate-[225deg] opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 sm:group-hover:rotate-[225deg] md:rotate-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="animate-rotate-3d via-primary h-px w-full bg-gradient-to-r from-transparent to-transparent" />
        <div className="text-base-content/60 container m-auto flex flex-col items-center justify-between gap-4 p-4 text-xs md:flex-row md:px-0 md:text-sm">
          <p>&copy; {currentYear} BookConnect | All rights reserved</p>
          <div className="flex items-center gap-4">
            {bottomLinks.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-base-content">
                {label}
              </a>
            ))}
          </div>
        </div>
        <span className="from-primary/20 absolute inset-x-0 bottom-0 left-0 -z-10 h-1/3 w-full bg-gradient-to-t" />
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-rotate-3d {
          animation: rotate3d 8s linear infinite;
        }
        .animate-energy-flow {
          animation: energy-flow 4s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes rotate3d {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(360deg);
          }
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
    </footer>
  );
};

export default Footer;
