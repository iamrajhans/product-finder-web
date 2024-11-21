"use client";
import { useState } from "react";
import { Search, Upload, TrendingUp, Filter } from "lucide-react";
import { useRouter } from "next/compat/router";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async (): Promise<void> => {
    if (query) {
      // Perform text search
      const response = await fetch(`/api/search?query=${query}`);
      const products = await response.json();
      router.push(`/search?query=${query}`);
      console.log("Text search results:", products);
    }

    if (image) {
      // Perform image search
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Image search results:", result);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      console.log("Selected image:", file.name);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text text-black">AI Product Finder</h1>
        <p className="text-gray-600">
          Find products across multiple platforms using text or images
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-2xl space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label
          htmlFor="imageUpload"
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          <Upload className="mr-2" />
          Upload Image
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Trending Tags */}
      <div className="flex items-center space-x-4">
        <TrendingUp className="text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {[
            "Wireless earbuds",
            "Smart home devices",
            "Fitness trackers",
            "Gaming laptops",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-blue-500 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center w-full max-w-2xl">
        <button className="flex items-center w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100">
          <Filter className="mr-2" />
          Add filter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
