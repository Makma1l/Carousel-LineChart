import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";

export default function CarouselPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API dan mahsulotlarni fetch qilish
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Mahsulotlarni to'rt tadan guruhlarga ajratish
        const productGroups = [];
        for (let i = 0; i < data.length; i += 4) {
          productGroups.push(data.slice(i, i + 4));
        }
        setProducts(productGroups);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {products.map((group, index) => (
            <div
              key={index}
              className="flex h-full items-center justify-center space-x-4 bg-gray-400 dark:bg-gray-700 dark:text-white"
            >
              {group.map((product) => (
                <div key={product.id} className="text-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 mx-auto"
                  />
                  <h3 className="mt-2 w-60">{product.title}</h3>
                  <p className="text-lg font-bold">${product.price}</p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
