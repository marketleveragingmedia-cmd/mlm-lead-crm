'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton({ style }: { style?: React.CSSProperties }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect anyway
      window.location.href = '/login';
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={style}
      type="button"
    >
      Logout
    </button>
  );
}
