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
          <p>Accessibility Options</p>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
          <p>Item 4</p>
        </div>
      )}
      <button onClick={toggleAccessibilityOptions} className="bg-blue-600 fixed bottom-4 right-4 z-50 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
        ♿
      </button>
    </div>
  );
}
