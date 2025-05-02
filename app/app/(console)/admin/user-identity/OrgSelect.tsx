"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getQuotaItem } from "../../_actions/quota.action";
import { useController } from "react-hook-form";

const OrgSelect = () => {
  const { field, formState } = useController({
    name: "id",
  });
  const { data } = useQuery({
    queryKey: ["get-quota-data"],
    queryFn: getQuotaItem,
  });
  return (
    <Select
      disabled={formState.disabled}
      key={field.value}
      value={field.value.toString()}
      defaultValue={field.value.toString()}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="capitalize"
            disabled={!!item.wallet}
          >
            {item.org_name} ({item.wallet ?? "No Identity"})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrgSelect;
