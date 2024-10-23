import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import WordDetails from "../components/WordDetails";
import { words as sampleWords } from "../sampleData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../Assets/img1.svg";
import bgImg from "../Assets/bgImg.jpg";
import { FaSearch } from 'react-icons/fa';
import { motivationalQuotes } from "../quotes"; // Import the quotes

const HomePage = () => {
  const [words, setWords] = useState(
    sampleWords.map((word) => ({ ...word, meanings: [word.meaning] }))
  );
  const [selectedWord, setSelectedWord] = useState(null);

  // State to manage the current quote
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Change the quote every 30 seconds
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => {
        const currentIndex = motivationalQuotes.indexOf(prevQuote);
        const nextIndex = (currentIndex + 1) % motivationalQuotes.length;
        return motivationalQuotes[nextIndex];
      });
    },10000); // 30 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query) => {
    const foundWord = words.find(
      (item) => item.word.toLowerCase() === query.toLowerCase()
    );
    setSelectedWord(
      foundWord || { word: query, meanings: ["No meaning found."] }
    );
  };

  const handleAddMeaning = (word, newMeaning) => {
    setWords(
      words.map((item) =>
        item.word === word
          ? { ...item, meanings: [...item.meanings, newMeaning] }
          : item
      )
    );
  };

  const handleEditMeaning = (word, updatedMeaning) => {
    setWords(
      words.map((item) =>
        item.word === word
          ? {
              ...item,
              meanings: item.meanings.map((meaning) =>
                meaning === selectedWord.meanings[0] ? updatedMeaning : meaning
              ),
            }
          : item
      )
    );
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Navbar */}
      <Navbar className="fixed top-0 left-0 w-full z-50" />{" "}
      {/* Full width navbar */}
      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center min-h-screen pt-20 pb-20">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-purple-500 opacity-60 blur-xl"></div>

        {/* Box with blurred background */}
        <div className="relative z-10 bg-white bg-opacity-50 backdrop-blur-3xl p-10 rounded-xl shadow-2xl">
          <h1 className="text-5xl text-customGray font-bold mb-6">
            Dictionary App
          </h1>

          <div className="flex items-center bg-white rounded-full shadow-md p-2 mb-6 w-full ">
            <input
              type="text"
              placeholder="Search word..."
              className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="px-4 py-2 text-white bg-blue-500 rounded-full">
              <FaSearch size={24} />
            </button>
          </div>

          {selectedWord && (
            <WordDetails
              word={selectedWord}
              onAddMeaning={handleAddMeaning}
              onEditMeaning={handleEditMeaning}
            />
          )}

          <div className="mt-6">
            <img src={img1} alt="Illustration" className="h-40 mx-auto" />
          </div>

          {/* Display the motivational quote */}
          <div className="mt-4 text-lg font-semibold text-gray-700">
            {currentQuote}
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer className="fixed bottom-0 left-0 w-full z-50" />{" "}
      {/* Full width footer */}
    </div>
  );
};

export default HomePage;
