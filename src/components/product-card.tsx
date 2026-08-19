import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
  onSelect: (product: Product) => void;
};

export function ProductCard({ product, eager = false, onSelect }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button
      className="product-card"
      type="button"
      aria-label={`${product.brand} ${product.name}, ${product.colorName} 상세 보기`}
      onClick={() => onSelect(product)}
    >
      <span className="product-image-wrap">
        {imageFailed ? (
          <span
            className="image-fallback"
            style={{ backgroundColor: product.hex }}
          >
            {product.colorName}
          </span>
        ) : (
          <Image
            className="product-image"
            src={product.imageUrl}
            alt={`${product.brand} ${product.name} ${product.colorName}`}
            fill
            sizes="(max-width: 699px) 50vw, (max-width: 1019px) 33vw, 25vw"
            loading={eager ? "eager" : "lazy"}
            onError={() => setImageFailed(true)}
          />
        )}
      </span>
      <span
        className="shade-strip"
        style={{ backgroundColor: product.hex }}
        aria-hidden="true"
      />
      <span className="product-copy">
        <span className="brand">{product.brand}</span>
        <span className="color-heading">
          <span
            className="swatch-dot"
            style={{ backgroundColor: product.hex }}
            aria-hidden="true"
          />
          <span className="line-clamp-two">{product.colorName}</span>
        </span>
        <span className="product-name line-clamp-two">{product.name}</span>
        <span className="product-meta">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="finish">{product.finish}</span>
        </span>
      </span>
    </button>
  );
}
