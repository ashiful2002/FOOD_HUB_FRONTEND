"use server";
export const getAllMeal = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      // next: {
      //   revalidate: 20,
      // },
    });
    const result = res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleMeal = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meal/${id}`, {
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
