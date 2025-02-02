import supabase from "./supabase";

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("獲取用戶失敗:", error.message);
    return null;
  }
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
  console.log("登出成功");
}
