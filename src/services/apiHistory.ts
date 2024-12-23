import supabase from "./supabase";

export async function getHistories() {
  const { data, error } = await supabase.from("histories").select("*");

  if (error) {
    throw new Error("histories could not be loaded!");
  }

  return data;
}

export async function deleteHistory(id: string) {
  const { error } = await supabase.from("histories").delete().eq("id", id);
  if (error) {
    throw new Error("history could not be deleted!");
  }

  return null;
}
