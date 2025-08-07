import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const passwordPattern =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Password must be 8-20 characters with at least one special character."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateUsername = () => {
    const usernamePattern = /^[A-Za-z\d]{3,}$/;
    if (!usernamePattern.test(username)) {
      setUsernameError(
        "Username must be at least 3 characters, no special symbols."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleNext = () => {
    if (validateEmail()) {
      setStep(2);
    }
  };

  const handlePasswordSubmit = () => {
    if (validatePassword()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (validateUsername()) {
      try {
        await addDoc(collection(db, "users"), {
          email,
          password,
          username,
          createdAt: serverTimestamp(),
        });

        toast.success("User registered successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
        setStep(1);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        {step === 1 && (
          <>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 text-gray-900"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="block text-gray-700 mt-4 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 text-gray-900"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 mt-2">{passwordError}</p>
            )}
            <button
              onClick={handlePasswordSubmit}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400 text-gray-900"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validateUsername}
            />
            {usernameError && (
              <p className="text-red-500 mt-2">{usernameError}</p>
            )}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
