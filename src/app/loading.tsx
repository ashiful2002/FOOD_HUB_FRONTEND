import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import Logo from "@/components/shared/logo";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function SpinnerCustom() {
  return (
    <div className="flex items-center justify-center gap-4 h-screen flex-col">
      <Spinner /> <Logo />
    </div>
  );
}

export default SpinnerCustom;
