// "use client";

// import { useEffect } from "react";
// import Link from "next/link";

// interface ErrorProps {
//   error: Error;
//   reset: () => void;
// }

// export default function GlobalError({ error, reset }: ErrorProps) {
//   useEffect(() => {
//     console.error("Global error caught:", error);
//   }, [error]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
//       <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
//       {/* <p className="text-muted-foreground mb-6">{error.message}</p> */}
//       <div className="flex gap-4">
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => reset()}
//         >
//           Try Again
//         </button>
//         <Link
//           href="/"
//           className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
//         >
//           Go Home
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Food404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-yellow-50 text-center">
      {/* 🍕 Pizza Bounce Animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-6xl mb-6"
      >
        🍕
      </motion.div>

      <h1 className="text-5xl font-bold mb-4 text-red-600">Oops! 404</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you’re looking for got eaten! Maybe try returning home before
        it disappears.
      </p>

      <Link href="/">
        <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
