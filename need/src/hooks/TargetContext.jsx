import { createContext, useContext, useState } from 'react';

const TargetContext = createContext();

export const useTargetContext = () => {
  return useContext(TargetContext)
};


export const TargetProvider = ({ children }) => {
  const [targetContext, setTargetContext] = useState("");

  return (
    <TargetContext.Provider value={{ targetContext, setTargetContext }}>
      {children}
    </TargetContext.Provider>
  );
};
