"use server";

import { cookies } from "next/headers";

export const createOrder = async (bookingData: any) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(bookingData),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
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

export const getSingleOrder = async (id: string) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
import { updateOrderStatus as updateOrderStatusService } from "@/services/order";

export const updateOrderStatusAction = async (orderId: string, status: string) => {
  return updateOrderStatusService(orderId, status);
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`,
      {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update order status");
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message || "Something went wrong");
  }
};
