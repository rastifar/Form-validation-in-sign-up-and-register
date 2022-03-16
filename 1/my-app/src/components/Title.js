import React from "react";
const Title = function (props) {
  console.log("title render");
  return (
    <h3
      style={{ display: "inline-block", color: "green", background: "yellow" }}
    >
      {props.children}
    </h3>
  );
};
export default React.memo(Title);
