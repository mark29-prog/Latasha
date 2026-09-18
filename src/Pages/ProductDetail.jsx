import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../Components/Home/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductById, getRelatedProducts } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  const product = getProductById(id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
        <h1 className="font-display text-3xl text-charcoal">
          Product Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          The product you are looking for does not exist or has been removed.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-burgundy px-6 py-3 text-sm font-medium text-white transition hover:bg-burgundy-dark"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const inCart = cartItems.find((item) => item.id === product.id);
  const hasSale = product.salePrice && product.salePrice < product.price;
  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-12">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="transition hover:text-burgundy">
            Home
          </Link>

          <span>/</span>

          <Link to="/shop" className="transition hover:text-burgundy">
            Shop
          </Link>

          <span>/</span>

          <Link
            to={`/shop?category=${product.categorySlug}`}
            className="transition hover:text-burgundy"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden bg-gray-100">
              <div className="aspect-[4/5]">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`w-20 overflow-hidden border-2 transition ${
                      index === activeImage
                        ? "border-burgundy"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-4">
            {/* Badges */}
            <div className="mb-4 flex gap-2">
              {product.isNew && (
                <span className="bg-burgundy px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                  New
                </span>
              )}

              {hasSale && (
                <span className="bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal">
                  Sale
                </span>
              )}
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
              {product.category}
            </p>

            <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-gold">
                {"★★★★★".split("").map((star, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(product.rating)
                        ? "opacity-100"
                        : "opacity-25"
                    }
                  >
                    {star}
                  </span>
                ))}
              </div>

              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold text-charcoal">
                GHC {(product.salePrice ?? product.price).toFixed(2)}
              </span>

              {hasSale && (
                <span className="text-lg text-gray-400 line-through">
                  GHC {product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
                    Select Size
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 border px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                        selectedSize === size
                          ? "border-burgundy bg-burgundy text-white"
                          : "border-charcoal/20 text-charcoal hover:border-burgundy"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
                Quantity
              </span>

              <div className="mt-3 flex w-fit items-center border border-charcoal/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-4 py-3 text-lg text-charcoal transition hover:bg-ivory"
                >
                  −
                </button>

                <span className="w-12 text-center text-sm font-semibold text-charcoal">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="px-4 py-3 text-lg text-charcoal transition hover:bg-ivory"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-burgundy px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-burgundy-dark"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <Link
                to="/cart"
                className="flex-1 border border-charcoal px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:bg-charcoal hover:text-white"
              >
                View Cart{inCart ? ` (${inCart.quantity})` : ""}
              </Link>
            </div>

            {/* Details List */}
            {product.details && (
              <div className="mt-10 border-t border-black/10 pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
                  Product Details
                </h2>

                <ul className="mt-4 space-y-2">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-black/5 bg-ivory px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 font-display text-3xl text-charcoal">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}