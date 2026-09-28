import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

export default function ProductCard({ product, onAddToCart }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [wishlistError, setWishlistError] = useState("");

  const toggleWishlist = async () => {
    setWishlistError("");
    try {
      if (wishlistItemId) {
        await api.removeWishlistItem(wishlistItemId);
        setWishlistItemId(null);
        setIsWishlisted(false);
      } else {
        const item = await api.addWishlistItem(product.id);
        setWishlistItemId(item.id);
        setIsWishlisted(true);
      }
    } catch (error) { setWishlistError(error.message); }
  };

  const displayPrice = product.salePrice ?? product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onPointerMove = (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(card, {
        rotateY: x * 5,
        rotateX: y * -5,
        transformPerspective: 900,
        transformOrigin: "center center",
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    };
    const resetTilt = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.65, ease: "elastic.out(1, 0.55)", overwrite: true });

    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", resetTilt);
    return () => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", resetTilt);
      gsap.killTweensOf(card);
      gsap.set(card, { clearProps: "transform" });
    };
  }, [reduceMotion]);

  return (
    <article ref={cardRef} className="group will-change-transform">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
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

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-white ${
            isWishlisted ? "text-burgundy" : "text-charcoal"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
        {wishlistError && <p role="alert" className="absolute right-2 top-14 max-w-40 bg-white p-2 text-xs text-red-700">{wishlistError}</p>}

        {/* Add to Cart */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="w-full bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal shadow-md transition hover:bg-burgundy hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-2 font-display text-lg text-charcoal">
          <Link
            to={`/product/${product.id}`}
            className="transition hover:text-burgundy"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="flex text-gold"
            aria-label={`${product.rating} out of 5 stars`}
          >
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

          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal">
            GHC {displayPrice.toFixed(2)}
          </span>

          {hasSale && (
            <span className="text-sm text-gray-400 line-through">
              GHC {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Mobile Add to Cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-4 w-full border border-charcoal px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-white sm:hidden"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
