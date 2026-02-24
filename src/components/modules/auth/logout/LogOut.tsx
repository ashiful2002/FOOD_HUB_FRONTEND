"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserLogOut } from "@/services/auth";

const LogOut = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    await UserLogOut(); // call server action
    router.push("/login"); // redirect
    router.refresh();
    setOpen(false); // close dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Logout Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Log out</Button>
      </DialogTrigger>

      {/* Dialog Modal */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You will need to log in again to
            access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogOut}>
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOut;
