import Photo from "./Photo";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setNewImages] = useState(false);
  const mounted = useRef(false);
  const getData = async () => {
    setLoading(true);
    let url;
    const pageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientId}${pageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientId}${pageUrl}`;
    }

    try {
      const { data } = await axios(url);
      setPhotos((oldPages) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPages, ...data.results];
        }
        return [...oldPages, ...data];
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!images) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line
  }, [images]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      getData();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="search"
            className="form-input"
          />
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((data, index) => {
            return <Photo key={index} {...data} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
