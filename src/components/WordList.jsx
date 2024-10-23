const WordList = ({ words, onDelete, onUpdate }) => {
    return (
      <div className="mt-6">
        {words.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.word}</h3>
              <p>{item.meanings.join(", ")}</p>
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
                  const newMeaning = prompt("Enter new meaning:", item.meanings[0]);
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
  