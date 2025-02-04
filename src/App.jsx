import React, { useState } from "react";
import { Undo2, BarChart2, List } from "lucide-react";
import { useMoodTracker } from "./hooks/use-mood-tracker";
import { MoodInput } from "./components/mood-input";
import { MOOD_OPTIONS } from "./constants/mood-options";
import { MoodEntry } from "./components/mood-entry";
import { MoodAnalytics } from "./components/mood-analytics";

function App() {
  const {
    moods,
    addMood,
    deleteMood,
    undoLastAction,
    clearMoods,
    deletedMood,
  } = useMoodTracker();
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="mt-10 max-w-md mx-auto p-4 bg-gray-100 rounded-lg">
      <h1 className="text-center font-bold">Mood Tracker</h1>
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setActiveTab("list")}
          className={`flex items-center p-2 ${
            activeTab === "list"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          <List className="mr-2" /> Mood List
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center p-2 ${
            activeTab === "analytics"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          <BarChart2 className="mr-2" /> Analytics
        </button>
      </div>

      {activeTab === "list" && (
        <>
          <MoodInput onAddMood={addMood} moodOptions={MOOD_OPTIONS} />

          {moods.length > 0 && (
            <div className="bg-white rounded shadow">
              <div className="flex justify-between items-center p-3 border-b">
                <div className="flex items-center space-x-2">
                  <h2 className="font-semibold">Mood Entries</h2>
                  {deletedMood && (
                    <button
                      onClick={undoLastAction}
                      className="text-green-500 hover:bg-green-100 p-1 rounded flex items-center"
                    >
                      <Undo2 size={16} className="mr-1" /> Undo
                    </button>
                  )}
                </div>
                <button
                  onClick={clearMoods}
                  className="text-red-500 hover:bg-red-100 p-2 rounded flex items-center"
                >
                  Clear All
                </button>
              </div>
              <ul className="divide-y max-h-64 overflow-y-auto">
                {moods.map((mood) => (
                  <MoodEntry key={mood.id} mood={mood} onDelete={deleteMood} />
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {activeTab === "analytics" && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4">Mood Analytics</h2>
          <MoodAnalytics moods={moods} moodOptions={MOOD_OPTIONS} />
        </div>
      )}
    </div>
  );
}

export default App;
