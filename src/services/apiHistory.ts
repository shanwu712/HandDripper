import supabase from "./supabase";

export async function getHistories() {
  const { data, error } = await supabase.from("histories").select("*");

  if (error) {
    throw new Error("histories could not be loaded!");
  }

  return data;
}
