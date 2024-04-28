import React from "react";

export function showModalWith({content}:{content:React.ReactNode}){
  const popupContainer = document.querySelector('.popupContainer')
  if(popupContainer){
    const popup = document.createElement('div')
    popup.classList.add('popup')
    popup.appendChild(content)
    popupContainer.appendChild(popup)
  }
}