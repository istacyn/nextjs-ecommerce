"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { submitFormData } from "./actions";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        await submitFormData(formData);

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="mb-4 max-w-md rounded bg-white px-8 pb-8 pt-6 text-[#808080] shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
        <p className="mb-4">Fill the form below:</p>
        <div className="mb-4">
          <input
            className="focus:shadow-outline mr-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="focus:shadow-outline mr-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="hover:bg-primary-dark focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
