"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// register user
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    ); 

    const result = await res.json();
    console.log(result);

    // If your backend also returns token after register
    const storeCookie = await cookies();

    if (result.success && result?.data?.token) {
      storeCookie.set("token", result.data.token);
    }
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

// log in user
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

// get user
export const getUser = async () => {
  const storeCookie = await cookies();

  const token = storeCookie.get("token")?.value;
  
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

// log out user
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
