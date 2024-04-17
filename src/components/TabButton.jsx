import React from 'react';



const TabButton = (props, onSelect,) => {

   
    
    
    return (
        <li>
            <button
            onClick={onSelect}>
            {props.children}
            </button>
        </li>
    );
};

export default TabButton;