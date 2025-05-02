"use server";

import supabaseServer from "@/lib/supabase.server";

export async function addNewEndpoint(
  url: string,
  apiKey: string,
  accountId: string
) {
  return supabaseServer.from("endpoints").insert({
    url,
    api_key: apiKey,
    account_id: accountId,
  });
}

export async function getEndpointDataById(id: string) {
  const { data: endpoint } = await supabaseServer
    .from("endpoints")
    .select("*")
    .eq("id", id)
    .single();

  const { data } = await supabaseServer
    .from("credit-quota")
    .select("*")
    .order("org_name", { ascending: true })
    .eq("endpoint_id", id);
  return { endpoint, data };
}
