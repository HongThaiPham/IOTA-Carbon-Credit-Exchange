import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { DatabaseZapIcon } from "lucide-react";
import React from "react";

const CreateTokenPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseZapIcon className="mr-2" />
          Create Token
        </CardTitle>
        <CardDescription>
          Use this page to create a new token for new carbon type services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This page is currently under construction. Please check back later for
          updates.
        </p>
        <p>
          If you have any questions or need assistance, please contact support.
        </p>
      </CardContent>
    </Card>
  );
};

export default CreateTokenPage;
