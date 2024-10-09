'use client'

import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["Earphone", "Humidifier"] as const;
const products = {
  "Earphone": ["JBL Noise Cancelling Headphones"],
  "Humidifier": ["pure enrichment Cool Mist Humidifier"],
} as const;

const reviews = {
  "JBL Noise Cancelling Headphones": {
    positive: "These JBL earbuds offer solid sound quality, clear bass, and decent mid-range, especially with the app’s EQ adjustment. While the fit may require some trial and error, and the lack of volume controls is a drawback, the app enhances functionality significantly, allowing customizable sound and noise settings. Ideal for those seeking affordable, good-quality earbuds with flexible sound options.",
    negative: "JBL earbuds fall short with poor fit and uncomfortable tips, lack of volume control, and mediocre noise cancellation. Requires an app for basic adjustments, making them frustrating to use."
  },
  "pure enrichment Cool Mist Humidifier": {
    positive: "This humidifier impresses with its top-fill design, spacious reservoir, and compact size. It offers various mist settings and beautiful light color options, making it both functional and stylish. The easy setup allows for the use of essential oils, while the sleep mode provides a calming atmosphere with low mist and no lights. Ideal for any room, it's user-friendly and enhances your space with its soothing mist and gentle night light.",
    negative: "Missing a piece of rubber on bottom and didn't work , water came  out the bottom."
  },
  "Laptop": {
    positive: "Powerful performance and sleek design.",
    negative: "Battery life could be better."
  },
  "Fiction": {
    positive: "Engaging storyline and well-developed characters.",
    negative: "The ending felt a bit rushed."
  },
  "Blender": {
    positive: "Efficient and easy to clean.",
    negative: "A bit noisy during operation."
  }
}

export function ProductReviewsComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedProduct(products[selectedCategory as keyof typeof products][0]); // Type assertion
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleProductChange} value={selectedProduct} disabled={!selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Products" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory && products[selectedCategory as keyof typeof products].map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 text-red-500" />
                  Positive Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reviews[selectedProduct as keyof typeof reviews]?.positive || "No positive review available."}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsDown className="mr-2 text-blue-500" />
                  Negative Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reviews[selectedProduct as keyof typeof reviews]?.negative || "No negative review available."}</p>
              </CardContent>
            </Card>
          </div>
        )}

          {selectedProduct && (
          <div className="text-center">
          <a href="https://amazon-review-website.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Button size="lg">More Detail</Button>
          </a>
        </div>
        )}
      </div>
    </div>
  )
}