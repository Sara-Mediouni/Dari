import React from "react";

const ContactPage = () => {
  return (
    <div className="font-general max-w-4xl mx-auto p-6 mt-40 bg-white rounded-2xl shadow-md mb-40">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-3">Contact Us</h1>
      
      <form className="grid gap-6">
        <div>
          <label className="block text-lg font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">Message</label>
          <textarea
            rows="5"
            placeholder="your message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          ></textarea>
        </div>

       <div className="flex items-center justify-center"> <button
          type="submit"
          className="bg-green-900 hover:text-white text-white font-bold py-2 px-6 rounded-xl transition duration-200"
        >
          Send
        </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
