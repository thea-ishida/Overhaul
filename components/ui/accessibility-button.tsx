"use client";
import { useState } from "react";

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccessibilityOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="mt-2 p-4 bottom-50 right-50 bg-white rounded-lg shadow-lg">
          <p>
            <b>Accessibility Options</b>
          </p>
          <button className="block w-full text-left p-2 bg-purple-100  hover:bg-blue-300 rounded-tl-lg rounded-tr-lg ">Item 1</button>
          <button className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300 ">Item 2</button>
          <button className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300 ">Item 3</button>
          <button className="block w-full text-left p-2 bg-purple-100 rounded-bl-lg rounded-br-lg hover:bg-blue-300  ">Item 4</button>
        </div>
      )}
      <button onClick={toggleAccessibilityOptions} className="bg-blue-600 fixed bottom-4 right-4 z-50 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
        ♿
      </button>
    </div>
  );
}
