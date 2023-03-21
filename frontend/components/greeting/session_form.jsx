import React from "react";
import { useSelector } from "react-redux";

function SessionForm() {
  
  const state = useSelector(state => state);
  console.log(state);

  return (
    <>
      HEY
    </>
  );
};

export default SessionForm;