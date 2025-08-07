
import { NavBar } from "@/components/nav-bar";
import { UserProvider } from "@/context/auth";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <UserProvider user={user}>
        <header>
          <NavBar />
        </header>
        {children}
      </UserProvider>
    </>
  );
}