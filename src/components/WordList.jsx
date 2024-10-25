const WordList = ({ words, onDelete, onUpdate }) => {
  return (
    <div className="mt-6">
      {words.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2"
        >
          <div>
            <h3 className="font-semibold text-lg">{item.word}</h3>
            <p className="text-sm text-gray-600">
              Meaning: {item.meanings || "No meaning available"}
            </p>
          </div>
          <div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mr-2"
              onClick={() => onDelete(item.word)}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              onClick={() => {
                // Use the string `item.meanings` (not an array) for editing
                const newMeaning = prompt("Enter new meaning:", item.meanings || "");
                if (newMeaning) onUpdate(item.word, newMeaning);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
