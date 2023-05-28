import React, { useEffect, useRef, useState } from "react";

const EmailVerification = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [isCodeValid, setIsCodeValid] = useState(false);
  const [verificationResult, setVerificationResult] = useState("");

  useEffect(() => {
    ref1.current.focus();
  }, []);

  const inputRefs = [ref1, ref2, ref3, ref4];
  const correctCode = "1234";
  const verifiedMsg = "Your email has been verified!";
  const unverifiedMsg = "The code you entered is invalid. Try again.";

  function focusAndSelect(ref) {
    ref.current.focus();
    ref.current.select();
  }

  function buildCode() {
    let code = "";
    inputRefs.forEach((ref) => {
      code += ref.current.value;
    });
    return code;
  }

  function verifyCode() {
    const enteredCode = buildCode();

    if (enteredCode === correctCode) {
      setIsCodeValid(true);
      setVerificationResult(verifiedMsg);
      inputRefs.forEach((ref) => (ref.current.disabled = true));
    } else {
      setVerificationResult(unverifiedMsg);
      inputRefs.forEach((ref) => (ref.current.value = ""));
      focusAndSelect(ref1);
    }
  }

  const refHasValue = (currentRef) => currentRef.current.value;

  function allRefsPopulated() {
    return inputRefs.every(refHasValue);
  }

  function handleInput(currentRef, nextRef = currentRef) {
    if (allRefsPopulated()) {
      verifyCode();
    } else if (currentRef.current.value) {
      focusAndSelect(nextRef);
    }
  }

  return (
    <>
      <h1 className="text-center mt-12 font-medium text-gray-900">
        Verify your email by entering the code we just emailed to you:
      </h1>

      <p className="italic text-center text-gray-500">
        (the valid code is 1234)
      </p>

      <div className="w-full max-w-md mx-auto mt-8 flex item-center justify-center mb-6 gap-2 text-4xl">
        <input
          className="w-1/4 h-20 border border-grey-color text-center"
          name="input1"
          maxLength="1"
          ref={ref1}
          onInput={() => {
            handleInput(ref1, ref2);
          }}
        />
        <input
          className="w-1/4 h-20 border border-grey-color text-center"
          name="input2"
          maxLength="1"
          ref={ref2}
          onInput={() => {
            handleInput(ref2, ref3);
          }}
        />
        <input
          className="w-1/4 h-20 border border-grey-color text-center"
          name="input3"
          maxLength="1"
          ref={ref3}
          onInput={() => {
            handleInput(ref3, ref4);
          }}
        />
        <input
          className="w-1/4 h-20 border border-grey-color text-center"
          name="input4"
          maxLength="1"
          ref={ref4}
          onInput={() => {
            handleInput(ref4);
          }}
        />
      </div>

      <div className="text-center">
        <p
          className={`mb-4 text-md font-medium ${
            isCodeValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {verificationResult}
        </p>
      </div>
    </>
  );
};

export default EmailVerification;
