import { useState } from "react";

function useInput(initialVal = "") {
  const [value, setvalue] = useState(initialVal);
  const resetInput = () => {
    setvalue("");
  };
  return [value ,  resetInput ];
}

export default useInput;