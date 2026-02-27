"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";

type Provider = {
  id: string;
  restaurantName: string;
  location: string;
  isApproved: boolean;
  logo: string;
};

export default function ProvidersTable({
  providers,
}: {
  providers: Provider[];
}) {
  const router = useRouter();
  console.table(providers);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Restaurant</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {providers.map((provider) => (
          <TableRow
            key={provider.id}
            className="cursor-pointer"
            onClick={() => router.push(`/providers/${provider.id}`)}
          >
            <TableCell>
              <Image
                src={provider.logo}
                alt="logo"
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
            </TableCell>

            <TableCell className="font-medium">
              {provider.restaurantName}
            </TableCell>

            <TableCell>{provider.location}</TableCell>

            <TableCell>
              {provider.isApproved ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <span className="text-red-600">Pending</span>
              )}
            </TableCell>
            <TableCell>
              <ArrowBigRight />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
