import React from "react";

const TextFields = ({
  name,
  id,
  value,
  placeholder,
  label,
  type = "text",
  onChange,
}) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full py-2 border rounded-lg focus:outline-none pl-1"
      />
    </div>
  );
};

export default TextFields;
