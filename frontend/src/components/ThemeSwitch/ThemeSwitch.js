import { ThemeContext } from 'Providers/ThemeProvider';
import React, { useContext } from 'react';
import { ReactComponent as Moon } from './Moon.svg';
import { ReactComponent as Sun } from './Sun.svg';
import './ThemeSwitch.css';

const ThemeSwitch = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);




  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        onChange={toggleTheme}
        defaultChecked={theme === "dark"}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default ThemeSwitch;
