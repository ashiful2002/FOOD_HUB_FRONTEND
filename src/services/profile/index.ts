"use server";

import { cookies } from "next/headers";

export const getProfile = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (data: {
  name?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  avatar?: string;
}) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};