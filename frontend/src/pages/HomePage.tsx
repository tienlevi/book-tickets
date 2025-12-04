import Card from "@/components/Card";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Book Your
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tickets
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Experience seamless ticket booking for your favorite events, matches,
          and shows. Fast, secure, and hassle-free.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
            aria-label="Get started with booking"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5 hover:bg-white/10"
            aria-label="Learn more about our services"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
        <Card
          icon="⚡"
          title="Lightning Fast"
          description="Book tickets in seconds with our optimized booking system"
        />
        <Card
          icon="🔒"
          title="Secure Payments"
          description="Your transactions are protected with industry-standard encryption"
        />
        <Card
          icon="📱"
          title="Mobile Ready"
          description="Access your tickets anywhere, anytime on any device"
        />
      </div>
    </div>
  );
};

export default HomePage;
