import React from "react";

const Root = (props) => {
  return (
    <div style={{ position: "fixed", width: "100vw", top: "9vh" }}>
      {props.children}
    </div>
  );
};

export default Root;
