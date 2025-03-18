// App.jsx
import  { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal"; 
import "./App.css";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "63mTEv5K_sw2vrKDcPwA3heOzkIZ2xx_yXjq22kpxMk";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.trim()) return;

    const controller = new AbortController();
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
          signal: controller.signal,
        });

        setImages((prevImages) =>
          page === 1
            ? response.data.results || []
            : [...prevImages, ...(response.data.results || [])]
        );
        setTotalPages(response.data.total_pages || 1);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError("Не вдалося завантажити зображення. Спробуйте пізніше.");
        toast.error("Помилка при завантаженні зображень");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    return () => controller.abort();
  }, [query, page]);

  const handleSearchSubmit = (searchTerm) => {
    if (!searchTerm.trim()) {
      toast.error("Поле пошуку не може бути пустим");
      return;
    }
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);

    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight / 1.5,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images || []} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {Array.isArray(images) &&
        images.length > 0 &&
        page < totalPages &&
        !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
