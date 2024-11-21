import { NextApiRequest, NextApiResponse } from "next";

// Mock product database
const mockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 50,
    image: "/images/earbuds.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Home Device",
    price: 150,
    image: "/images/smart-home.jpg",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Fitness Tracker",
    price: 100,
    image: "/images/fitness-tracker.jpg",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 1200,
    image: "/images/gaming-laptop.jpg",
    rating: 4.8,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { query } = req.query;

    // Perform basic filtering on the mock database
    const filteredProducts = mockProducts.filter((product) =>
      product.name.toLowerCase().includes((query as string).toLowerCase()),
    );

    res.status(200).json(filteredProducts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
