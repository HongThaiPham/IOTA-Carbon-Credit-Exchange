import React from "react";
import { getEndpointDataById } from "../(console)/_actions/endpoint.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuildingIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableCellEditAmount from "./TableCellEditAmount";
type Props = {
  org: string;
};
const Web2DataTableEditor: React.FC<Props> = async ({ org }) => {
  const { data, endpoint } = await getEndpointDataById(org);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <BuildingIcon className="mr-2 size-5" />
          ORG {org} data
        </CardTitle>
        <CardDescription>
          Data Endpoint:{" "}
          {endpoint?.url ? (
            <a href={endpoint?.url} target="_blank">
              {endpoint?.url}
            </a>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Data from the endpoint. You can edit the data in the table below.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ORG ID</TableHead>
              <TableHead>ORG NAME</TableHead>
              {/* <TableHead>ORG WALLET</TableHead>
              <TableHead>ORG MINT</TableHead> */}
              <TableHead className="text-right">CREDIT AMOUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.org_name}</TableCell>
                {/* <TableCell>{item.wallet ?? "N/A"}</TableCell>
                <TableCell>{item.mint ?? "N/A"}</TableCell> */}

                <TableCell className="flex justify-end">
                  <TableCellEditAmount
                    value={item.credit_amount ?? 0}
                    id={item.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Web2DataTableEditor;
