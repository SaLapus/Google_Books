import React from "react";
import "./Categories.sass";

import { useAppDispatch } from "app/hooks";
import { setCategory } from "app/slices/search/searchSlice";

function Categories() {
  const dispatch = useAppDispatch();
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const category = event.target.value;

    dispatch(setCategory(category));
  };

  return (
    <div className="Categories">
      <select className="Categories-select" onChange={handleChange}>
        <option value="all" defaultChecked>
          Все категории
        </option>
        <option value="art">Искусство</option>
        <option value="biography">Биографии</option>
        <option value="computers">Компьютеры</option>
        <option value="history">История</option>
        <option value="medical">Медицина</option>
        <option value="poetry">Поэзия</option>
      </select>
    </div>
  );
}

export default Categories;
