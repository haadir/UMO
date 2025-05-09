export type Memory = {
  id: string;
  transcript: string;
  imageUrl: string;
  title: string;
  date: string;
};

const STORAGE_KEY = "umo_memories";

export function getMemories(): Memory[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMemory(memory: Memory) {
  const memories = getMemories();
  memories.unshift(memory); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function updateMemory(id: string, updates: Partial<Memory>) {
  const memories = getMemories();
  const idx = memories.findIndex((m) => m.id === id);
  if (idx !== -1) {
    memories[idx] = { ...memories[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  }
}

export function deleteMemory(id: string) {
  const memories = getMemories().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function getMemoryById(id: string): Memory | undefined {
  return getMemories().find((m) => m.id === id);
}
