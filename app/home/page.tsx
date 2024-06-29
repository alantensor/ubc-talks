// Feed with infinite scroll

import { createBrowserClient } from "@supabase/ssr";

export default async function Home() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
  const { data: notes } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
