import { HistoryFormData } from "../Type/HistoryFormData";
import supabase from "./supabase";

export async function getHistories<T>(columnName: string = "*"): Promise<T[]> {
  const { data, error } = await supabase.from("histories").select(columnName);

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
