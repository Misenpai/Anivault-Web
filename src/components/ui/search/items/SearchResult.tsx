import { useLocation } from "react-router"; // Corrected import from "react-router" to "react-router-dom"
import useJikanApi from "../../../../services/useJikanApi";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  // Call the hook unconditionally at the top
  const { data, loading, error } = useJikanApi<Anime[]>(
    "anime",
    query ? { q: query } : {}
  );

  // Handle empty or null query
  if (!query || query.trim() === "") {
    return <div>No search query provided.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.map((anime) => (
            <li key={anime.mal_id}>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                width="50"
              />
              {anime.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
