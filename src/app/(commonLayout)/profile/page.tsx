// app/profile/page.tsx

import { getProfile } from "@/services/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogOut from "@/components/modules/auth/logout/LogOut";
import UpdateProfileModal from "@/components/modules/auth/profile/UpdateProfileModal";

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-red-500",
  PROVIDER: "bg-purple-500",
  USER: "bg-blue-500",
};

const ProfilePage = async () => {
  const res = await getProfile();
  const user = res?.data?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        User not found
      </div>
    );
  }

  const hasAddress = user.street || user.city || user.postalCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border-none">
        <CardHeader className="flex flex-col items-center gap-4 text-center">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={user.avatar || ""} />
            <AvatarFallback className="text-2xl font-bold bg-red-500 text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>

          <div className="flex gap-2 flex-wrap justify-center">
            <Badge className={`${ROLE_COLORS[user.role] ?? "bg-gray-500"} text-white`}>
              {user.role}
            </Badge>
            <Badge
              variant="outline"
              className={
                user.status === "ACTIVE"
                  ? "border-green-500 text-green-600"
                  : "border-gray-400 text-gray-500"
              }
            >
              {user.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone ?? "—"}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Address</p>
            {hasAddress ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {user.street && (
                  <div>
                    <p className="text-xs text-gray-400">Street</p>
                    <p className="font-medium">{user.street}</p>
                  </div>
                )}
                {user.city && (
                  <div>
                    <p className="text-xs text-gray-400">City</p>
                    <p className="font-medium">{user.city}</p>
                  </div>
                )}
                {user.postalCode && (
                  <div>
                    <p className="text-xs text-gray-400">Postal Code</p>
                    <p className="font-medium">{user.postalCode}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="font-medium text-gray-400 italic">No address provided</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <UpdateProfileModal user={user} />
            <LogOut />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
