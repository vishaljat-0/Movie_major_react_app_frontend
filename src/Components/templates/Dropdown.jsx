import React from "react";

const Dropdown = ({ title, option, fun, value }) => {
  return (
    <div className="dropdown-container w-[10%] ]  ">
      <select
        className="dropdown-select hidden xl:block   lg:block" 
        onChange={fun}
        value={title} // Ensure the value is bound to the current state
        name="format"
        id="format"
      >
        <option value="" disabled style={{ color: "gray" }}>
          {title}
        </option>
        {option.map((o, i) => (
          <option key={i} value={o.toLowerCase()}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
