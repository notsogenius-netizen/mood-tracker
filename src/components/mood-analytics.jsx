import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MoodAnalytics = ({ moods, moodOptions }) => {
  const prepareMoodData = () => {
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.text] = (acc[mood.text] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(moodCounts).map(([text, count]) => {
      const moodConfig = moodOptions.find((m) => m.text === text);
      return { name: text, count, color: moodConfig.color };
    });
  };

  if (moods.length === 0) {
    return <p className="text-gray-500">No mood data available</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Mood Distribution</h3>
        <BarChart width={330} height={200} data={prepareMoodData()}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {prepareMoodData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Mood Pie Chart</h3>
        <PieChart width={330} height={200}>
          <Pie
            data={prepareMoodData()}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {prepareMoodData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};
