import Head from "next/head";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Product Finder</title>
        <meta
          name="description"
          content="Find products using text or image search"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-black">
          Welcome to Product Finder
        </h1>

        {/* Search Bar */}
        <SearchBar />

        {/* Trending Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Trending Searches</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="p-4 bg-white shadow rounded hover:shadow-lg transition"
              >
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <p className="text-center text-gray-700">Product {item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-4 bg-white shadow rounded hover:shadow-lg transition"
              >
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <p className="text-center text-gray-700">Product {item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
