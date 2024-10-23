import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-customGray text-customPink p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dictionary App</h1>
    </nav>
  );
};

export default Navbar;
