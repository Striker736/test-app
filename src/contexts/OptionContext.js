import React, { useState } from "react";

let defaultValue = {
  filterOption: "date",
  sizeOption: "large",
};

export const OptionContext = React.createContext(defaultValue);

export const OptionContextProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState(defaultValue.filterOption);
  const [sizeOption, setSizeOption] = useState(defaultValue.sizeOption);

  const updateOption = (ACTION_TYPE, value) => {
    switch (ACTION_TYPE) {
      case "ON_FILTEROPTION_CHANGE":
        setFilterOption(value);
        break;
      case "ON_SIZEOPTION_CHANGE":
        setSizeOption(value);
        break;
      default:
    }
  };

  return (
    <OptionContext.Provider value={{ filterOption, sizeOption, updateOption }}>
      {children}
    </OptionContext.Provider>
  );
};
