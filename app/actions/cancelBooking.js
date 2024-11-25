"use server";

import { createSessionClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";

async function cancelBooking(bookingId) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const { user } = await checkAuth();
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    revalidatePath("/bookings");
  } catch (error) {
    return {
      error: "Error",
      error,
    };
  }
}
export default cancelBooking;
