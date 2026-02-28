"use server";

import ProvidersTable from "@/components/providers/ProvidersTable";
import { getAllProviders } from "@/services/providers";

const page = async () => {
  const response = await getAllProviders();

  const providers = Array.isArray(response?.data)
    ? response.data
    : response?.data
    ? [response.data]
    : [];

  return (
    <div className="p-6">
      <ProvidersTable providers={providers} />
    </div>
  );
};

export default page;