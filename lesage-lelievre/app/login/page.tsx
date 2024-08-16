'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false); // Ajoutez cet état pour vérifier si le composant est monté
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Marquer comme monté une fois que l'effet est exécuté
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return; // Si le composant n'est pas monté, ne faites rien

    // Logique de connexion ici
    router.push('/profile');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-10">Connexion</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Se connecter
        </button>
      </form>
    </div>
  );
}