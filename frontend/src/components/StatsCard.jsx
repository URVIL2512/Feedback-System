export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
    </div>
  );
}

