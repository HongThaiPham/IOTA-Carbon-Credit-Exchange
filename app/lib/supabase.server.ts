import { createClient } from "@supabase/supabase-js";

import { Database } from "./supabase";

// Create a single supabase client for interacting with your database
const supabaseServer = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

export default supabaseServer;
