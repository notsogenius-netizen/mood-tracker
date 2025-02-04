import { useEffect, useState } from "react";

export const useMoodTracker = () => {
  const [moods, setMoods] = useState(() => {
    const savedMoods = localStorage.getItem("moodEntries");
    return savedMoods ? JSON.parse(savedMoods) : [];
  });
  const [deletedMood, setDeletedMood] = useState(null);

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moods));
  }, [moods]);

  const addMood = (mood) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...mood,
    };
    setMoods((prevMoods) => [...prevMoods, newEntry]);
  };

  const deleteMood = (moodId) => {
    const moodToDelete = moods.find((mood) => mood.id === moodId);
    setDeletedMood(moodToDelete);
    setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== moodId));
  };

  const undoLastAction = () => {
    if (deletedMood) {
      setMoods((prevMoods) => [...prevMoods, deletedMood]);
      setDeletedMood(null);
    }
  };

  const clearMoods = () => {
    setDeletedMood(null);
    setMoods([]);
  };

  return {
    moods,
    addMood,
    deleteMood,
    undoLastAction,
    clearMoods,
    deletedMood,
  };
};
