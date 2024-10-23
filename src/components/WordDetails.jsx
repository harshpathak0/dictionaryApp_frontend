import { useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const WordDetails = ({ word, onAddMeaning, onEditMeaning }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedMeaning, setSelectedMeaning] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewMeaning("");
  };

  const openEditModal = (meaning) => {
    setSelectedMeaning(meaning);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedMeaning("");
  };

  const handleAddMeaning = () => {
    if (newMeaning.trim()) {
      onAddMeaning(word.word, newMeaning);
      closeAddModal();
    }
  };

  const handleEditMeaning = () => {
    if (selectedMeaning.trim()) {
      onEditMeaning(word.word, selectedMeaning);
      closeEditModal();
    }
  };

  if (!word) return <p className="mt-4 text-gray-500">No word selected.</p>;

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-md">
      <h2 className="text-xl font-bold">{word.word}</h2>
      <ul className="mt-2">
        {word.meanings.map((meaning, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-md mb-2"
          >
            <span className="">{meaning}</span>
            <div className="p-2">
              <button
                className="bg-yellow-400 text-white p-3 rounded-md hover:bg-yellow-600 ml-1 "
                onClick={() => openEditModal(meaning)}
              >
                <FaEdit size={18} />
              </button>
              <button
                className="bg-red-400 text-white p-3 rounded-md hover:bg-red-600 ml-3"
                onClick={() => openEditModal(meaning)}
              >
                <FaTrash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Meaning Button */}
      <button
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        onClick={openAddModal}
      >
        Add Meaning
      </button>

      {/* Add Meaning Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add New Meaning"
      >
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new meaning..."
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          onClick={handleAddMeaning}
        >
          Add
        </button>
      </Modal>

      {/* Edit Meaning Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Meaning"
      >
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMeaning}
          onChange={(e) => setSelectedMeaning(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
          onClick={handleEditMeaning}
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default WordDetails;
