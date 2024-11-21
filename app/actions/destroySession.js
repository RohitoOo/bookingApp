"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
async function destroySession() {
  // RETRIEVE SESSION COOKIE

  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    return { error: "No Session Cookie Found" };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // DELETE SESSION

    await account.deleteSession("current");

    // CLEAR SESSION COOKIE

    cookies().delete("appwrite-session");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error Deleting Session",
    };
  }
}

export default destroySession;
