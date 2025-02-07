import toast from "react-hot-toast";
import { HistoryFormData } from "../Type/HistoryFormData";
import supabase from "./supabase";

export async function getHistories<T>(
  userId: string,
  columnName: string = "*",
  toRange: boolean = false,
  id?: string,
): Promise<T[]> {
  let query = supabase
    .from("histories")
    .select(columnName)
    .eq("user_id", userId);

  if (toRange)
    query = query
      .order("date", { ascending: false })
      .order("added_time", { ascending: false });

  if (id) query = query.eq("id", id);

  const { data, error } = await query;

  if (error) {
    throw new Error("histories could not be loaded!");
  }

  return data as T[];
}

export async function deleteHistory(id: string) {
  const { error } = await supabase
    .from("histories")
    .delete()
    .eq("id", id)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
  if (error) {
    throw new Error("history could not be deleted!");
  }

  return null;
}

export async function createAHistory(newHistory: HistoryFormData) {
  const { data, error } = await supabase
    .from("histories")
    .insert([newHistory])
    .select();
  if (error) {
    throw new Error("histories could not be created!");
  }

  return data;
}

export async function updateHistory(id: string, historyObj: HistoryFormData) {
  const { data, error } = await supabase
    .from("histories")
    .update(historyObj)
    .eq("id", id)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .select()
    .single();

  if (error) {
    throw new Error("histories could not be updated!");
  }
  return data;
}

export async function updateIsPined(
  id: string,
  userId: string,
  isPined: boolean,
) {
  const { data, error } = await supabase
    .from("histories")
    .update({ isPined: !isPined })
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) {
    toast.error("Something went wrong!");
  }
  return data;
}
