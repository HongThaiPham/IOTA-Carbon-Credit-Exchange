"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { BuildingIcon } from "lucide-react";
import React from "react";
import { getQuotaItem } from "../../_actions/quota.action";
import NetworkExplorerLink from "@/components/NetworkExplorerLink";
import SkeletonWapper from "@/components/SkeletonWapper";

const IdentityDataTable = () => {
  const { data, isPending } = useQuery({
    queryKey: ["identity-data"],
    queryFn: getQuotaItem,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <BuildingIcon className="mr-2 size-5" />
          Identity data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SkeletonWapper isLoading={isPending}>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ORG ID</TableHead>
                <TableHead>ORG NAME</TableHead>
                <TableHead>ORG WALLET</TableHead>
                <TableHead className="text-right">CREDIT AMOUNT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.org_name}</TableCell>
                  <TableCell>
                    {item.wallet ? (
                      <NetworkExplorerLink addressOrTx={item.wallet} />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>

                  <TableCell className="flex justify-end">
                    {item.credit_amount?.toLocaleString() ?? 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SkeletonWapper>
      </CardContent>
    </Card>
  );
};

export default IdentityDataTable;
