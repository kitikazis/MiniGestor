export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Buscar..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
    />
  );
}
