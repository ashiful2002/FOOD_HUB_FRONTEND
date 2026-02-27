"use server";

import { cookies } from "next/headers";

export const createMeal = async (mealData: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(mealData),
  });
  const result = await res.json();

  console.log("backend response", result)
  console.log("res", res)

  return result;
};

export const getAllMeal = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store",
      next: {
        revalidate: 20,
      },
    });
    const result = res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleMeal = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("getSingleMeal error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
