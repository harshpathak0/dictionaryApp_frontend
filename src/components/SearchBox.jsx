import { useState } from "react";

const SearchBox = ({ words, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filteredSuggestions = words
      .filter((item) => item.word.toLowerCase().includes(value.toLowerCase()))
      .map((item) => item.word);

    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery("");
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search words..."
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border rounded-md mt-2 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 w-full lg:w-40 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 text-lg"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
