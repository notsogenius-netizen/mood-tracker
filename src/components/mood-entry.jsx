import { Trash2 } from "lucide-react";

export const MoodEntry = ({ mood, onDelete }) => (
  <li className="p-3 flex justify-between items-center">
    <div>
      <span className="font-medium">{mood.date}</span>
      <span className="ml-2">
        {mood.emoji} {mood.text}
      </span>
    </div>
    <button
      onClick={() => onDelete(mood.id)}
      className="text-red-500 hover:bg-red-100 p-1 rounded"
    >
      <Trash2 size={16} />
    </button>
  </li>
);
