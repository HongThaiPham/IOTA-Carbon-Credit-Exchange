import supabaseServer from "@/lib/supabase.server";

export async function GET() {
  const { data } = await supabaseServer
    .from("credit-quota")
    .select("id, org_name, credit_amount")
    .filter("endpoint_id", "eq", "e074df49-59f4-4eda-a2fe-d6bc687d3d83");
  return Response.json(data);
}
