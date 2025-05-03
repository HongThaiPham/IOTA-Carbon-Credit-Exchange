import ConsumeForm from "@/components/ConsumeForm";
import HistoryTable from "@/components/HistoryTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryIcon, Plus } from "lucide-react";
import React from "react";

const ConsumerPage = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Retire carbon credit token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConsumeForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" /> Retire transaction history
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <HistoryTable type="RETIRE" />
        </CardContent>
      </Card>
    </>
  );
};

export default ConsumerPage;
