import { createClient } from "@supabase/supabase-js";

import { Database } from "./supabase";

// Create a single supabase client for interacting with your database
const supabaseServer = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

export default supabaseServer;
