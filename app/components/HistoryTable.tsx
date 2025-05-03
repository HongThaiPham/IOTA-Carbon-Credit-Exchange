"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHistory } from "../app/(console)/_actions/history.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonWapper from "@/components/SkeletonWapper";
import NetworkExplorerLink from "@/components/NetworkExplorerLink";
type Props = {
  type: "MINT" | "RETIRE";
};
const HistoryTable: React.FC<Props> = ({ type }) => {
  const { data, isPending } = useQuery({
    queryKey: ["transactionHistory", type],
    queryFn: () => getHistory(type),
  });
  return (
    <SkeletonWapper isLoading={isPending}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx ID</TableHead>
            <TableHead>Token Mint</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.id ? <NetworkExplorerLink addressOrTx={item.id} /> : null}
              </TableCell>
              <TableCell>
                {item.mint ? (
                  <NetworkExplorerLink addressOrTx={item.mint} />
                ) : null}
              </TableCell>

              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-right">
                {new Date(item.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SkeletonWapper>
  );
};

export default HistoryTable;
