import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import useSession from "@/hooks/useSession";

const Home = () => {
  const { user } = useSession();

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

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <span className="text-4xl mb-2 block">{"🔒"}</span>
            <CardTitle className="text-xl text-white">
              {"Secure Payments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400">
              {
                "Your transactions are protected with industry-standard encryption"
              }
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
