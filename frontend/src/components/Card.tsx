type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

const Card = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Card;
