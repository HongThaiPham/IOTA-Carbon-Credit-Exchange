import React from "react";

export default async function Web2OrgLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ orgid: string }>;
}>) {
  const { orgid } = await params;
  return (
    <main className="h-screen">
      <div className="bg-linear-to-r from-cyan-500 to-blue-500 h-48">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl text-white font-bold">
            Web2 data management for ORG{" "}
            <span className="uppercase">{orgid}</span>
          </h2>
        </div>
      </div>
      <div className="container mx-auto p-3">{children}</div>
    </main>
  );
}
