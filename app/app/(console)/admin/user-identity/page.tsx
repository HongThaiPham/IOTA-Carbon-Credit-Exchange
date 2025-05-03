import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseZapIcon } from "lucide-react";
import React from "react";
import UserIdentityForm from "./UserIdentityForm";
import IdentityDataTable from "./IdentityDataTable";

const UserIdentity = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseZapIcon className="mr-2" />
            User Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserIdentityForm />
        </CardContent>
      </Card>
      <IdentityDataTable />
    </>
  );
};

export default UserIdentity;
