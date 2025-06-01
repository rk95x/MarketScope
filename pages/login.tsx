import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.push('/api/auth/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to eBay login...</h1>
        <p>If you are not redirected automatically, please click the button below.</p>
        <button
          onClick={() => router.push('/api/auth/login')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login with eBay
        </button>
      </div>
    </div>
  );
} 