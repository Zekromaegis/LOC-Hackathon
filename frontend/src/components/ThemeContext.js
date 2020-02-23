import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    isLight: false,
    dark: { background: '#161616', text: '#ccc', secondary: '#fff', card: '#4c4c4c' },
    light: { background: '#eee', text: '#3c3c3c', secondary: '#000', card: '#9c9c9c' }
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const loggedHandle = val => {
    setLoggedIn(val);
  };

  const handleChange = () => {
    setTheme(prevState => ({
      ...prevState,
      isLight: !prevState.isLight
    }));
  };
  return (
    <ThemeContext.Provider value={{ ...theme, handleChange, loggedIn, loggedHandle }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
