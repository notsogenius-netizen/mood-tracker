import { useState } from "react";

export const MoodInput = ({ onAddMood, moodOptions }) => {
  const [selectedMood, setSelectedMood] = useState("");

  const handleAddMood = () => {
    if (selectedMood) {
      const mood = moodOptions.find((m) => m.emoji === selectedMood);
      onAddMood(mood);
      setSelectedMood("");
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <select
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
        className="flex-grow p-2 border rounded"
      >
        <option value="">Select a Mood</option>
        {moodOptions.map((mood) => (
          <option key={mood.emoji} value={mood.emoji}>
            {mood.emoji} {mood.text}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddMood}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Mood
      </button>
    </div>
  );
};
