import ProvidersMenutable from "@/components/providers/ProvidersMenutable";
import { getSingleProvider } from "@/services/providers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSingleProvider(id);
  console.log(data.meals);

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* 🔥 Hero Section */}
      <div className="relative h-64 w-full bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-6 left-8 text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            {data.restaurantName}
          </h1>
          <p className="text-sm mt-2 opacity-90">{data.location}</p>
        </div>
      </div>

      {/* 🔥 Content Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Logo Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={data.logo}
              alt="Restaurant Logo"
              className="w-40 h-40 object-cover rounded-xl shadow-md"
            />

            <span
              className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${
                data.isApproved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {data.isApproved ? "Approved Provider" : "Pending Approval"}
            </span>
          </div>

          {/* Details Card */}
          <div className="p-4 md:col-span-2 bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">About Restaurant</h2>
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{data.location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="font-medium">
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(data.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Provider ID</p>
                <p className="font-medium text-xs break-all">{data.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
<ProvidersMenutable meals={data.meals} />    </div>
  );
}
