'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTheme } from 'next-themes';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Link from 'next/link';

export default function LoginPage() {
    const supabase = createClientComponentClient();
    const { theme } = useTheme();

    return (
        <main className="flex flex-col w-full min-h-screen m-auto  items-center">
            <div className='flex flex-col w-full p-4 items-end'>
                <ModeToggle />
            </div>
            <Link href="/" className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 rounded-full bg-primary"></div>
                <span className="text-4xl font-bold">TripMemories</span>
            </Link>
            <div className="flex flex-1 items-center justify-center w-full">
                <div className='w-full max-w-md'>
                    <Auth
                        supabaseClient={supabase}
                        view="magic_link"
                        appearance={{ theme: ThemeSupa }}
                        theme={theme === 'dark' ? 'dark' : 'light'}
                        showLinks={true}
                        providers={['google', 'github']}
                        redirectTo="http://localhost:3000"
                    />
                </div>
            </div>
        </main>
    );
}