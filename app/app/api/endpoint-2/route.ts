import supabaseServer from "@/lib/supabase.server";

export async function GET() {
  const { data } = await supabaseServer
    .from("credit-quota")
    .select("*")
    .filter("endpoint_id", "eq", "ee4e4ede-3676-47eb-952a-5d22696559b4");
  return Response.json(data);
}
