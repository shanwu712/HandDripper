import { HistoryFormData } from "../Type/HistoryFormData";
import supabase from "./supabase";

export async function getHistories<T>(
  columnName: string = "*",
  toRange: boolean = false,
): Promise<T[]> {
  let query = supabase.from("histories").select(columnName);

  if (toRange)
    query = query
      .order("date", { ascending: false })
      .order("added_time", { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error("histories could not be loaded!");
  }

  return data as T[];
}

export async function deleteHistory(id: string) {
  const { error } = await supabase.from("histories").delete().eq("id", id);
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
    .select()
    .single();

  if (error) {
    throw new Error("histories could not be updated!");
  }
  return data;
}
