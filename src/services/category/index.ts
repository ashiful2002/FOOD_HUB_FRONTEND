"use server";

import { cookies } from "next/headers";

export const getCategories = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: token!,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
