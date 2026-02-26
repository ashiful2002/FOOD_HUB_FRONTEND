"use server";

import { cookies } from "next/headers";

export const createBooking = async (bookingData: any) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(bookingData),
    });
    const result = await res.json();
    console.log(result);

    // if (result.success && result?.data?.token) {
    //   storeCookie.set("token", result.data.token);
    // }
    // console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
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
