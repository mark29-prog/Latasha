export const categories = [
  {
    id: 1,
    name: "Dresses",
    slug: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Tops",
    slug: "tops",
    image:
      "https://images.unsplash.com/photo-1564257577054-6e7c1c5f5f1a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Skirts",
    slug: "skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Trousers",
    slug: "trousers",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Shoes",
    slug: "shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Bags",
    slug: "bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
];

export const products = [
  {
    id: 1,
    name: "Satin Evening Dress",
    category: "Dresses",
    categorySlug: "dresses",
    price: 349,
    salePrice: 279,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isFeatured: true,
    description:
      "A beautifully draped satin evening dress with a fluid silhouette that moves with you. Designed for moments that deserve to be remembered.",
    details: [
      "Premium satin fabric",
      "Concealed side zip",
      "Fully lined",
      "Dry clean only",
    ],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Elegant Linen Blouse",
    category: "Tops",
    categorySlug: "tops",
    price: 189,
    rating: 4.7,
    reviews: 87,
    isNew: true,
    isFeatured: true,
    description:
      "An effortless linen blouse with a relaxed fit and refined detailing. A wardrobe staple that transitions from day to evening.",
    details: [
      "Breathable linen blend",
      "Relaxed fit",
      "Mother-of-pearl buttons",
      "Machine washable",
    ],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1564257577054-6e7c1c5f5f1a?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "Pleated Midi Skirt",
    category: "Skirts",
    categorySlug: "skirts",
    price: 229,
    rating: 4.6,
    reviews: 63,
    isNew: true,
    isFeatured: true,
    description:
      "A finely pleated midi skirt that catches the light with every step. Timeless elegance with a modern edge.",
    details: [
      "Fine accordion pleats",
      "Elasticated waistband",
      "Midi length",
      "Dry clean recommended",
    ],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Tailored Wide-Leg Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 259,
    salePrice: 219,
    rating: 4.9,
    reviews: 158,
    isNew: true,
    isFeatured: true,
    description:
      "Impeccably tailored wide-leg trousers with a high waist and fluid drape. Sharp, confident and endlessly versatile.",
    details: [
      "Tailored crepe fabric",
      "High-rise fit",
      "Side pockets",
      "Dry clean only",
    ],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Classic Leather Heels",
    category: "Shoes",
    categorySlug: "shoes",
    price: 399,
    rating: 4.8,
    reviews: 91,
    isNew: true,
    isFeatured: true,
    description:
      "Handcrafted leather heels with a sculpted silhouette. The finishing touch to any refined look.",
    details: [
      "Genuine leather upper",
      "Cushioned insole",
      "85mm heel",
      "Leather sole",
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: 6,
    name: "Structured Mini Bag",
    category: "Bags",
    categorySlug: "bags",
    price: 319,
    salePrice: 269,
    rating: 4.7,
    reviews: 76,
    isNew: true,
    isFeatured: true,
    description:
      "A structured mini bag with a polished finish and just the right amount of space. Elegant form meets everyday function.",
    details: [
      "Premium vegan leather",
      "Gold-tone hardware",
      "Detachable strap",
      "Fully lined interior",
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["One Size"],
  },
  {
    id: 7,
    name: "Gold Statement Earrings",
    category: "Accessories",
    categorySlug: "accessories",
    price: 129,
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isFeatured: true,
    description:
      "Sculptural gold-tone statement earrings designed to catch the light and complete your look with a touch of drama.",
    details: [
      "18k gold-plated brass",
      "Lightweight design",
      "Secure post closure",
      "Nickel free",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["One Size"],
  },
  {
    id: 8,
    name: "Flowing Summer Dress",
    category: "Dresses",
    categorySlug: "dresses",
    price: 289,
    rating: 4.8,
    reviews: 112,
    isNew: true,
    isFeatured: false,
    description:
      "A lightweight summer dress with a flowing hem and soft movement. Made for warm days and effortless elegance.",
    details: [
      "Lightweight viscose",
      "Adjustable straps",
      "Flowing A-line skirt",
      "Machine washable",
    ],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Silk Wrap Top",
    category: "Tops",
    categorySlug: "tops",
    price: 209,
    rating: 4.6,
    reviews: 54,
    isNew: false,
    isFeatured: true,
    description:
      "A luxurious silk wrap top that flatters every figure. Soft, fluid and endlessly elegant.",
    details: [
      "100% mulberry silk",
      "Wrap-front design",
      "Tie waist",
      "Dry clean only",
    ],
    images: [
      "https://images.unsplash.com/photo-1564257577054-6e7c1c5f5f1a?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 10,
    name: "Leather Crossbody Bag",
    category: "Bags",
    categorySlug: "bags",
    price: 359,
    rating: 4.8,
    reviews: 88,
    isNew: false,
    isFeatured: true,
    description:
      "A refined leather crossbody bag with clean lines and practical proportions. Effortless luxury for every day.",
    details: [
      "Genuine leather",
      "Adjustable crossbody strap",
      "Magnetic closure",
      "Interior zip pocket",
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["One Size"],
  },
  {
    id: 11,
    name: "Pearl Drop Necklace",
    category: "Accessories",
    categorySlug: "accessories",
    price: 149,
    salePrice: 119,
    rating: 4.9,
    reviews: 167,
    isNew: false,
    isFeatured: true,
    description:
      "A delicate pearl drop necklace that adds a touch of quiet sophistication to any neckline.",
    details: [
      "Freshwater pearls",
      "Gold-plated chain",
      "16-inch length",
      "Lobster clasp",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["One Size"],
  },
  {
    id: 12,
    name: "Suede Ankle Boots",
    category: "Shoes",
    categorySlug: "shoes",
    price: 379,
    rating: 4.7,
    reviews: 72,
    isNew: false,
    isFeatured: false,
    description:
      "Soft suede ankle boots with a sleek profile and comfortable heel. The perfect transition piece for cooler days.",
    details: [
      "Genuine suede upper",
      "Stacked heel",
      "Side zip",
      "Cushioned footbed",
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
];

export function getProductById(id) {
  return products.find((product) => String(product.id) === String(id));
}

export function getProductsByCategory(slug) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured);
}

export function getNewArrivals() {
  return products.filter((product) => product.isNew);
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];

  return products
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug && item.id !== product.id
    )
    .slice(0, limit);
}