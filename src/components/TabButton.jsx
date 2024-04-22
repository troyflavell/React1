import React from 'react';




const TabButton = ({children, onSelect, isSelected}) => {


  console.log("isSelected", isSelected)

    
    
    return (
        <li  >
            <button className={isSelected ? "active" : ""}
            onClick={onSelect}>
            {children}
            </button>
        </li>
    );
};

export default TabButton;