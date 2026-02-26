export const getAllProviders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/providers`, {
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
export const getSingleProvider = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/providers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        // next: {
        //   revalidate: 20,
        // },
      }
    );
    const result = res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
