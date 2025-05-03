import React from "react";
import Web2DataTableEditor from "../Web2DataTableEditor";
type Props = {
  params: Promise<{ orgid: string }>;
};
const Web2Page: React.FC<Props> = async ({ params }) => {
  const { orgid } = await params;
  return (
    <div>
      <Web2DataTableEditor org={orgid} />
    </div>
  );
};

export default Web2Page;
