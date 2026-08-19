import { FINISHES, type Finish } from "@/data/products";

type FinishFilterProps = {
  selected: Finish;
  onChange: (finish: Finish) => void;
};

export function FinishFilter({ selected, onChange }: FinishFilterProps) {
  return (
    <div className="finish-filter" role="group" aria-label="제형 필터">
      {FINISHES.map((finish) => (
        <button
          className="filter-button"
          type="button"
          key={finish}
          aria-pressed={selected === finish}
          onClick={() => onChange(finish)}
        >
          {finish}
        </button>
      ))}
    </div>
  );
}
