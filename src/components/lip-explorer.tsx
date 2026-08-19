"use client";

import { Search, X } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { FinishFilter } from "@/components/finish-filter";
import { ProductCard } from "@/components/product-card";
import { ProductSheet } from "@/components/product-sheet";
import type { Finish, Product } from "@/data/products";

type LipExplorerProps = {
  products: Product[];
};

export function LipExplorer({ products }: LipExplorerProps) {
  const [query, setQuery] = useState("");
  const [finish, setFinish] = useState<Finish>("전체");
  const [selectedShade, setSelectedShade] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

    return products.filter((product) => {
      const matchesFinish = finish === "전체" || product.finish === finish;
      const searchableText = `${product.brand} ${product.name} ${product.colorName}`
        .toLocaleLowerCase("ko-KR");
      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesFinish && matchesQuery;
    });
  }, [finish, products, query]);

  const openProduct = (product: Product) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelectedProduct(product);
  };

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <main className="page-shell">
      <header className="site-header">
        <span className="wordmark">MOOD LIP</span>
        <span className="header-note">12 SHADES</span>
      </header>

      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <span className="eyebrow">Find your lip mood</span>
          <h1 id="intro-title">오늘의 립 컬러를 찾아보세요.</h1>
          <p>
            컬러와 제형을 비교해 지금의 무드에 가까운 립을 찾아보세요.
          </p>
        </div>
        <div className="shade-index-wrap">
          <div className="shade-index" role="group" aria-label="립 컬러 미리보기">
            {products.map((product) => (
              <button
                className="shade-index-button"
                type="button"
                key={product.id}
                aria-label={`${product.colorName} ${product.hex} 크게 보기`}
                aria-pressed={selectedShade?.id === product.id}
                onClick={() => setSelectedShade(product)}
              >
                <span style={{ backgroundColor: product.hex }} />
              </button>
            ))}
          </div>

          {selectedShade ? (
            <div className="shade-preview" aria-live="polite">
              <div
                className="shade-preview-color"
                style={{ backgroundColor: selectedShade.hex }}
                role="img"
                aria-label={`${selectedShade.colorName} 실제 컬러 ${selectedShade.hex}`}
              />
              <div className="shade-preview-copy">
                <div>
                  <span>{selectedShade.brand}</span>
                  <strong>{selectedShade.colorName}</strong>
                </div>
                <code>{selectedShade.hex}</code>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="explore-tools" aria-label="립 컬러 검색 및 필터">
        <div className="tool-row">
          <div className="search-wrap">
            <Search strokeWidth={1.8} aria-hidden="true" />
            <label className="sr-only" htmlFor="shade-search">
              브랜드, 제품명 또는 컬러명 검색
            </label>
            <input
              className="search-input"
              id="shade-search"
              type="search"
              value={query}
              placeholder="브랜드 또는 컬러를 검색해보세요"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                className="clear-search"
                type="button"
                aria-label="검색어 지우기"
                onClick={() => setQuery("")}
              >
                <X strokeWidth={1.8} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <FinishFilter selected={finish} onChange={setFinish} />
        </div>
      </section>

      <section aria-labelledby="results-title">
        <div className="results-head">
          <h2 id="results-title">컬러 둘러보기</h2>
          <p aria-live="polite">
            {filteredProducts.length}개 컬러
          </p>
        </div>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                eager={index < 4}
                onSelect={openProduct}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <div>
              <h2>찾는 컬러가 없어요.</h2>
              <p>
                다른 브랜드나 컬러명을 검색하거나
                <br />
                제형 필터를 바꿔보세요.
              </p>
            </div>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <span>MOOD LIP</span>
        <span>12 COLORS · 4 BRANDS</span>
      </footer>

      <ProductSheet product={selectedProduct} onClose={closeProduct} />
    </main>
  );
}
