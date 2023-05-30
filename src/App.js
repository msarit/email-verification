import React, { useEffect, useRef, useState } from "react";
import EmailVerification from "./emailVerification";

function App() {
  const nameField = useRef();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isValidatorVisible, setIsValidatorVisible] = useState(false);

  useEffect(() => {
    nameField.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormVisible(false);
    setIsValidatorVisible(true);
  };

  return (
    <div className="p-8">
      {isFormVisible && (
        <form className="w-full max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              ref={nameField}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-lg mx-auto p-4 rounded"
          >
            Sign Up
          </button>
        </form>
      )}
      {isValidatorVisible && <EmailVerification />}
    </div>
  );
}

export default App;
