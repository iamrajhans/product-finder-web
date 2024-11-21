import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const { query, image } = router.query;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      // Fetch text-based results
      fetch(`/api/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }

    if (image) {
      // Handle image-based search (mock logic here)
      console.log("Image search triggered:", image);
    }
  }, [query, image]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <p className="font-semibold">{product.name}</p>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
