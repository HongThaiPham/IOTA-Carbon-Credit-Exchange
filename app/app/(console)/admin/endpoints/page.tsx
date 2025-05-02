import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EndpointForm from "./EndpointForm";
import { DatabaseZapIcon } from "lucide-react";

const EndpointPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseZapIcon className="mr-2" />
          Configure Carbon Credit Registry Endpoint
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EndpointForm />
      </CardContent>
    </Card>
  );
};

export default EndpointPage;
