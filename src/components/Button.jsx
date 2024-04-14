import React from "react";

const Button = ({ onClick, styles }) => (
  <button type="button" onClick={onClick} className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Upload Video
  </button>
);

export default Button;
