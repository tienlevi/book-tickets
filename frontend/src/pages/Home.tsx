import Matches from "@/components/Matches/Matches";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Book Your Football matches {""}
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tickets
          </span>
        </h1>
      </div>

      <Matches />
    </div>
  );
};

export default Home;
