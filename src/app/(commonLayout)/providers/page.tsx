"use server";

import ProvidersTable from "@/components/providers/ProvidersTable";
import { getAllProviders } from "@/services/providers";

const page = async () => {
  const { data } = await getAllProviders();

  return (
    <div className="p-6">
      <ProvidersTable providers={data} />
    </div>
  );
};

export default page;
