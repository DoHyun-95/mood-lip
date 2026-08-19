import { LipExplorer } from "@/components/lip-explorer";
import { products } from "@/data/products";

export default function Home() {
  return <LipExplorer products={products} />;
}
