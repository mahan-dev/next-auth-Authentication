import React from "react";

const Input = ({ name, type, value, onChange, className }) => {
  return (
    <input
      className={className}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={name}
    />
  );
};

export default Input;
