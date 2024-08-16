import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthRedirect = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/flashcards');
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
};

export default AuthRedirect;
