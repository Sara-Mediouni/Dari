import React from "react";

const AboutPage = () => {
  return (
    <div className="font-general max-w-4xl mx-auto p-6 mt-40 bg-white rounded-2xl shadow-md text-green-700 mb-40">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-2">About Dari</h1>
      <p className="text-lg leading-8 text-gray-800">
Welcome to <span className="font-semibold text-pink-2">Dari</span>, your online store dedicated to traditional Tunisian products and crafts.
<br /><br />
Our mission is to preserve and promote the cultural riches of our country through a carefully chosen selection of products:
<span className="font-semibold text-pink-1">traditional clothing, local crafts, local culinary products</span>, and much more.
<br /><br />
Each item is a celebration of local know-how and authentic heritage passed down from generation to generation.
<br /><br />
Thank you for being part of this adventure with us.
</p>
    </div>
  );
};

export default AboutPage;
