export const FINISHES = ["전체", "매트", "글로시", "벨벳"] as const;

export type Finish = (typeof FINISHES)[number];
export type ProductFinish = Exclude<Finish, "전체">;

export type Product = {
  id: number;
  brand: string;
  name: string;
  colorName: string;
  hex: string;
  finish: ProductFinish;
  price: number;
  imageUrl: string;
};

export const products: Product[] = [
  { id: 1, brand: "로지크", name: "벨벳 립 틴트", colorName: "01 세비체 로즈", hex: "#C94F5B", finish: "벨벳", price: 14000, imageUrl: "https://picsum.photos/seed/lip1/400/300" },
  { id: 2, brand: "로지크", name: "벨벳 립 틴트", colorName: "02 무화과 브라운", hex: "#A85548", finish: "벨벳", price: 14000, imageUrl: "https://picsum.photos/seed/lip2/400/300" },
  { id: 3, brand: "무드피크", name: "글로우 세럼 립", colorName: "코랄 시럽", hex: "#E8756A", finish: "글로시", price: 18500, imageUrl: "https://picsum.photos/seed/lip3/400/300" },
  { id: 4, brand: "무드피크", name: "글로우 세럼 립", colorName: "로즈 허니", hex: "#D96A80", finish: "글로시", price: 18500, imageUrl: "https://picsum.photos/seed/lip4/400/300" },
  { id: 5, brand: "탱로우", name: "매트 픽서 루즈", colorName: "브릭 시즌", hex: "#9E4A3E", finish: "매트", price: 21000, imageUrl: "https://picsum.photos/seed/lip5/400/300" },
  { id: 6, brand: "탱로우", name: "매트 픽서 루즈", colorName: "모브 무드", hex: "#B06478", finish: "매트", price: 21000, imageUrl: "https://picsum.photos/seed/lip6/400/300" },
  { id: 7, brand: "코이드", name: "워터핏 틴트", colorName: "체리 소다", hex: "#D43D4F", finish: "글로시", price: 12000, imageUrl: "https://picsum.photos/seed/lip7/400/300" },
  { id: 8, brand: "코이드", name: "워터핏 틴트", colorName: "살구 크림", hex: "#E58E74", finish: "글로시", price: 12000, imageUrl: "https://picsum.photos/seed/lip8/400/300" },
  { id: 9, brand: "베르노", name: "실키 매트 스틱", colorName: "토프 로즈", hex: "#A96A62", finish: "매트", price: 26000, imageUrl: "https://picsum.photos/seed/lip9/400/300" },
  { id: 10, brand: "베르노", name: "실키 매트 스틱", colorName: "딥 플럼", hex: "#8C3A52", finish: "매트", price: 26000, imageUrl: "https://picsum.photos/seed/lip10/400/300" },
  { id: 11, brand: "로지크", name: "무드 블러 밤", colorName: "누드 피치", hex: "#D99280", finish: "벨벳", price: 15500, imageUrl: "https://picsum.photos/seed/lip11/400/300" },
  { id: 12, brand: "무드피크", name: "글로우 세럼 립", colorName: "베리 펀치", hex: "#B04A6E", finish: "글로시", price: 18500, imageUrl: "https://picsum.photos/seed/lip12/400/300" },
];
