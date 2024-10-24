import React, { useState, useEffect } from "react";
import WordDetails from "../components/WordDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../Assets/img1.svg";
import bgImg from "../Assets/bgImg.jpg";
import { FaSearch } from "react-icons/fa";
import { motivationalQuotes } from "../quotes";
import { api } from "../service/api";

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState({ meanings: [] });
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await api.getWords();
        console.log("Fetched words:", response.data.data);
        setWords(response.data.data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (query === "") {
      setFilteredWords([]);
      return;
    }

    const filtered = words.filter((wordObj) =>
      wordObj.word.toLowerCase().startsWith(query.toLowerCase())
    );

    setFilteredWords(filtered);
  }, [query, words]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => {
        const currentIndex = motivationalQuotes.indexOf(prevQuote);
        const nextIndex = (currentIndex + 1) % motivationalQuotes.length;
        return motivationalQuotes[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle word selection and fetch meanings
  const handleWordSelect = async (word) => {
    try {
        const response = await api.getMeaningsForWord(word._id);
        console.log('API response:', response.data);
        const meanings = response.data.data || [];
        console.log('Fetched meanings for word:', meanings);
        setFilteredWords([]); 
        setSelectedWord({ ...word, meanings });
    } catch (error) {
        console.error("Error fetching meanings:", error);
        setSelectedWord({ ...word, meanings: [] });
    }
};
  
const handleAddMeaning = async (wordId, newMeaning) => {
  try {
    const response = await api.createMeaning(wordId, newMeaning);
    const updatedMeaning = response.data.data;

    setWords((prevWords) =>
      prevWords.map((item) =>
        item._id === wordId
          ? { ...item, meanings: [...item.meanings, updatedMeaning] }
          : item
      )
    );
  } catch (error) {
    console.error("Error adding meaning:", error);
  }
};

const handleEditMeaning = async (wordId, meaningId, updatedMeaning) => {
  try {
    await api.editMeaning(meaningId, updatedMeaning);
    setWords((prevWords) =>
      prevWords.map((item) =>
        item._id === wordId
          ? {
              ...item,
              meanings: item.meanings.map((meaning) =>
                meaning._id === meaningId
                  ? { ...meaning, meaning: updatedMeaning }
                  : meaning
              ),
            }
          : item
      )
    );
  } catch (error) {
    console.error("Error editing meaning:", error);
  }
};

const handleDeleteMeaning = async (wordId, meaningId) => {
  try {
    await api.deleteMeaning(meaningId);

    setWords((prevWords) =>
      prevWords.map((item) => {
        if (item._id === wordId) {
          const updatedMeanings = item.meanings
            ? item.meanings.filter((meaning) => meaning._id !== meaningId)
            : [];

          if (item._id === selectedWord._id) {
            setSelectedWord({
              ...item,
              meanings: updatedMeanings,  
            });
          }

          return {
            ...item,
            meanings: updatedMeanings,
          };
        }
        return item;
      })
    );
  } catch (error) {
    console.error("Error deleting meaning:", error);
  }
};

return (
  <div
    className="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url(${bgImg})' }}
  >
    <Navbar className="fixed top-0 left-0 w-full z-50" />

    <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center min-h-screen pt-20 pb-20">
      <div className="absolute inset-0 bg-purple-500 opacity-60 blur-xl"></div>

      <div className="relative z-10 bg-white bg-opacity-50 backdrop-blur-3xl p-10 rounded-xl shadow-2xl">
        <h1 className="text-5xl text-customGray font-bold mb-6">
          Dictionary App
        </h1>

        <div className="flex items-center bg-white rounded-full shadow-md p-2 mb-6 w-full">
          <input
            type="text"
            placeholder="Search word..."
            className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
            onChange={handleSearch}
            value={query}
          />
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full">
            <FaSearch size={20} />
          </button>
        </div>

        {filteredWords.length > 0 && (
          <ul className="absolute left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 min-h-40 overflow-y-auto">
            {filteredWords.map((wordObj) => (
              <li
                key={wordObj._id}
                onClick={() => handleWordSelect(wordObj)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
              >
                {wordObj.word}
              </li>
            ))}
          </ul>
        )}

        {selectedWord && (
          <WordDetails
            word={selectedWord}
            onAddMeaning={handleAddMeaning}
            onEditMeaning={handleEditMeaning}
            onDeleteMeaning={handleDeleteMeaning}
          />
        )}

        <div className="mt-6">
          <img src={img1} alt="Illustration" className="h-40 mx-auto" />
        </div>

        <div className="mt-4 text-lg font-semibold text-gray-700">
          {currentQuote}
        </div>
      </div>
    </main>
    <Footer className="fixed bottom-0 left-0 w-full z-50" />
  </div>
);
};

export default HomePage;