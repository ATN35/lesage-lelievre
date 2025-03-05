"use client";

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Nous Contacter</h1>
      <p className="text-gray-600 mt-4">Laissez-nous un message et nous vous répondrons dès que possible.</p>
      
      <form className="mt-8 max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <input type="text" placeholder="Nom" className="w-full p-3 border rounded-lg mb-4" required />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4" required />
        <textarea placeholder="Votre message" className="w-full p-3 border rounded-lg mb-4" rows={4} required></textarea>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition">
          Envoyer
        </button>
      </form>
    </div>
  );
}
