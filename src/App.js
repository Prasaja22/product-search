import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const url = "https://fakestoreapi.com/products";
    fetch(url)
      .then((response) => response.json())
      .then((c) => setData(c))
      .catch((err) => console.error("error fetching", err));
  }, []);

  useEffect(() => {
    const filtered = data.filter((newItem) =>
      newItem.title.toLowerCase().includes(title.toLowerCase())
    );

    setFilter(filtered);
  }, [data, title]);

  function handleSearch(e) {
    setTitle(e.target.value);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} title={title} />
      <CardFilm data={title ? filter : data} />
    </>
  );
}

function SearchBar({ onSearch, title }) {
  return (
    <div className="flex items-center justify-center mt-5">
      <input
        value={title}
        type="text"
        className="border rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="cari film"
        onChange={onSearch}
      ></input>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r">
        Cari
      </button>
    </div>
  );
}

function CardFilm({ data }) {
  return (
    <div className="max-w-screen-2xl w-full flex flex-wrap justify-center mt-4 gap-3">
      {data.map((item, i) => (
        <div
          className="flex flex-wrap bg-white p-6 shadow-md rounded-md max-w-md w-full md:w-1/3"
          key={i}
        >
          <img
            className="w-full h-32 object-cover mb-4 rounded-md"
            src={item.image}
            alt="gambar"
          />
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 h-[100px] overflow-hidden">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
