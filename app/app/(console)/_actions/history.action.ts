"use server";
import { CARBON_TOKEN_TYPE } from "@/lib/constants";
import supabaseServer from "@/lib/supabase.server";

export async function getHistory(type: "MINT" | "RETIRE") {
  const { data, error } = await supabaseServer
    .from("mint-transactions")
    .select("*")
    .eq("type", type)
    .is("token_account", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }
  return data;
}

export async function insertHistory(
  tx: string,
  amount: string,
  type: "MINT" | "RETIRE"
) {
  return supabaseServer
    .from("mint-transactions")
    .insert({ id: tx, mint: CARBON_TOKEN_TYPE, amount, type })
    .select("*");
}
