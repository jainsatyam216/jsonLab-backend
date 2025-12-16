import { db } from "./firebase.js";

export const saveHistory = async ({
  user_id,
  url,
  method,
  headers,
  params,
  body,
}) => {
  await db.collection("history").add({
    user_id,
    url,
    method,
    headers,
    params,
    body,
    created_at: new Date(),
  });
};