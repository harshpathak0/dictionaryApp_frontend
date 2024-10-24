import { useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const WordDetails = ({ word, onAddMeaning, onEditMeaning, onDeleteMeaning }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedMeaningId, setSelectedMeaningId] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewMeaning("");
  };

  const openEditModal = (meaning) => {
    setSelectedMeaning(meaning.meaning);
    setSelectedMeaningId(meaning._id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedMeaning("");
  };

  const handleAddMeaning = () => {
    if (newMeaning.trim()) {
      onAddMeaning(word._id, newMeaning);
      closeAddModal();
    }
  };

  const handleEditMeaning = () => {
    if (selectedMeaning.trim()) {
      onEditMeaning(word._id, selectedMeaningId, selectedMeaning); 
      closeEditModal();
    }
  };

  // Handle deleting meaning
  const handleDeleteMeaning = (meaningId) => {
    onDeleteMeaning(word._id, meaningId); // Pass delete action to parent
  };

  if (!word) return <p className="mt-4 text-gray-500">No word selected.</p>;

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-md">
      <h2 className="text-xl font-bold">{word.word}</h2>
      <ul className="mt-2 min-h-[80px] overflow-auto max-h-[300px]">
        {word.meanings && word.meanings.length > 0 ? (
          word.meanings.map((meaning) => (
            <li
              key={meaning._id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-md mb-2"
            >
              <span>{meaning.meaning}</span>
              <div className="flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openEditModal(meaning)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteMeaning(meaning._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No meanings added yet.</p>
        )}
      </ul>

      {/* Add Meaning Button */}
      <button
        onClick={openAddModal}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
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
