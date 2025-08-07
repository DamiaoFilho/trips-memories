'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTheme } from 'next-themes';

export default function LoginPage() {
    const supabase = createClientComponentClient();
    const { theme } = useTheme();

  return (
    <main className="flex flex-col w-[50%] min-h-screen m-auto pt-10 pb-10 justify-center">
        <Auth
          supabaseClient={supabase}
          view="magic_link"
          appearance={{ theme: ThemeSupa }}
          theme={theme === 'dark' ? 'dark' : 'default'}
          showLinks={true}
          providers={['google', 'github']}
          redirectTo="http://localhost:3000/auth/callback"
        />
    </main>
  );
}