import React, { useState } from "react";

export default function useFormFields<T>(initialState: T) {
  const [inputs, setValues] = useState(initialState);
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...inputs, [evt.target.id]: evt.target.value });
  };
  const handleReset = () => {
    setValues((prevState) => ({ ...prevState, ...initialState }));
  };
  return { inputs, handleInputChange, handleReset };
}
