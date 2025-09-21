import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex items-center space-x-20 justify-center">
      <h1 className="text-xl font-bold"> Movie App</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-2xl bg-white outline-0 rounded text-black"
        />
        <button className="bg-blue-500 px-4 rounded">🔍Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
