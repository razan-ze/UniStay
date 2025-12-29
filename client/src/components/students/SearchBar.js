import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/students/SearchBar.css"; 

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search university or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
