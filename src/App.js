import React, { useEffect, useRef, useState } from "react";
import EmailVerification from "./emailVerification";

function App() {
  const nameField = useRef();
  const signupBtn = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isValidatorVisible, setIsValidatorVisible] = useState(false);

  const VALID_EMAIL_REGEX = /\S+@\S+\.\S+/;

  useEffect(() => {
    nameField.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email) {
      setFormErrors("Some required fields are missing.");
      return;
    }

    if (name.length < 3) {
      setFormErrors("Name is too short.");
      return;
    }

    if (!VALID_EMAIL_REGEX.test(email)) {
      setFormErrors("Email is invalid.");
      return;
    }

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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <p className="text-red-500 text-sm">{formErrors}</p>
          </div>
          <button
            type="submit"
            ref={signupBtn}
            className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-lg mx-auto p-4 rounded pointer:cursor"
          >
            sign up
          </button>
        </form>
      )}
      {isValidatorVisible && <EmailVerification />}
    </div>
  );
}

export default App;
