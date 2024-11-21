import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle file uploads
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "File upload error", error: err });
      }

      // For now, log the uploaded file details
      console.log(files);

      // In a real application, you would process the image and fetch similar products.
      res.status(200).json({ message: "File uploaded successfully", files });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
