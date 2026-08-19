import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

type ProductSheetProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductSheet({ product, onClose }: ProductSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && product) {
        event.preventDefault();
        onClose();
      }
    };

    if (product && !dialog.open) {
      setImageFailed(false);
      dialog.showModal();
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else if (!product && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose, product]);

  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      aria-labelledby="product-sheet-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onClose={onClose}
    >
      {product ? (
        <div className="sheet-layout">
          <button
            className="sheet-close"
            type="button"
            aria-label="상세 정보 닫기"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <div className="sheet-visuals">
            <div
              className="sheet-media"
              style={{ backgroundColor: product.hex }}
            >
              {imageFailed ? (
                <div
                  className="image-fallback"
                  style={{ backgroundColor: product.hex }}
                >
                  {product.colorName}
                </div>
              ) : (
                <Image
                  className="product-image"
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name} ${product.colorName}`}
                  fill
                  sizes="(max-width: 699px) 100vw, 58vw"
                  loading="eager"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>

            <div
              className="sheet-shade"
              style={{ backgroundColor: product.hex }}
              role="img"
              aria-label={`실제 컬러 ${product.hex}`}
            />
          </div>

          <div className="sheet-copy">
            <p className="brand">{product.brand}</p>
            <h2 id="product-sheet-title">{product.colorName}</h2>
            <p className="sheet-product-name">{product.name}</p>

            <dl className="sheet-details">
              <div>
                <dt>제형</dt>
                <dd>{product.finish}</dd>
              </div>
              <div>
                <dt>가격</dt>
                <dd>{formatPrice(product.price)}</dd>
              </div>
              <div>
                <dt>브랜드</dt>
                <dd>{product.brand}</dd>
              </div>
              <div>
                <dt>HEX</dt>
                <dd>{product.hex}</dd>
              </div>
            </dl>

            <div className="sheet-actions" aria-label="구매 기능 준비 중">
              <button type="button" disabled>
                <ShoppingBag size={17} strokeWidth={1.7} aria-hidden="true" />
                장바구니
              </button>
              <button className="purchase-button" type="button" disabled>
                구매하기
              </button>
            </div>
            <p className="sheet-action-note">구매 기능은 준비 중입니다.</p>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
