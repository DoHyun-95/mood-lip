# MOOD LIP

18–25세 사용자를 위한 모바일 우선 립 컬러 탐색 MVP입니다. 제품을 구매하는 흐름보다 컬러와 제형을 빠르게 발견하고 비교하는 경험에 집중했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드 검증:

```bash
npm run lint
npm run build
```

## 구현 기능

- 12개 립 제품 카드 및 실제 HEX shade 시각화
- 전체 / 매트 / 글로시 / 벨벳 제형 필터
- 브랜드명, 제품명, 컬러명 실시간 검색
- 제품 상세 Bottom Sheet
- 320px부터 데스크톱까지 대응하는 반응형 그리드
- 키보드 포커스, ESC 닫기, `aria-pressed`, 이미지 대체 상태

## 가장 신경 쓴 부분

제품 사진보다 실제 립 컬러가 먼저 인지되도록 각 제품의 HEX를 카드의 shade strip과 swatch, 상세 화면의 넓은 컬러 면으로 연결했습니다. `#f7f4ed` 기반의 따뜻한 뉴트럴 UI와 얇은 보더를 사용해 쇼핑 카탈로그의 익숙함은 유지하면서도 구매보다 컬러 발견에 초점을 맞췄습니다.

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React

데이터는 `src/data/products.ts`의 정적 배열로 관리하며 별도의 API, 데이터베이스 또는 환경 변수가 필요하지 않습니다.
