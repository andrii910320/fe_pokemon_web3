import { useMemo } from "react";
import s from "./style.module.css";
function Pagination({ page, totalPages, setPage }) {
  const pages = useMemo(() => {
    const range = [];
    for (
      let i = Math.max(1, page - 2);
      i <= Math.min(totalPages, page + 2);
      i++
    ) {
      range.push(i);
    }
    return range;
  }, [page, totalPages]);

  return (
    <div className={s.pagination}>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ← Prev
        </button>
       
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
      <div>
        {pages.map((p) => (
          <button
            key={p}
            className={p === page ? s.active : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Pagination;
