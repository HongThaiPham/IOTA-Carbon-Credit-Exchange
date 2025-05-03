import supabaseServer from "@/lib/supabase.server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ org: string }> }
) {
  const { org } = await params;

  const { data } = await supabaseServer
    .from("credit-quota")
    .select("id, org_name, credit_amount")
    .filter("endpoint_id", "eq", org);
  return Response.json(data);
}
