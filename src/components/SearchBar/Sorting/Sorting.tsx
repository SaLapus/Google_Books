import React from "react";
import "./Sorting.sass";

import { useAppDispatch } from "app/hooks";
import { setSorting } from "app/slices/search/searchSlice";

function Sorting() {
  const dispatch = useAppDispatch();
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const sorting = event.target.value;

    dispatch(setSorting(sorting));
  };

  return (
    <div className="Sorting">
      <select className="Sorting-select" onChange={handleChange}>
        <option value="relevance" defaultChecked>
          Релевантные
        </option>
        <option value="newest">Новые</option>
      </select>
    </div>
  );
}

export default Sorting;
