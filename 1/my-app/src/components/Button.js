import React from "react";
const Button = function ({ children, onClick }) {
  console.log("button render");
  return <button onClick={onClick}>{children}</button>;
};

export default React.memo(Button);
