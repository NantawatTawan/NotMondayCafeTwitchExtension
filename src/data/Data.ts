export interface SkinData {
  id: string;
  name: string;
  spriteIndex: number; // ยังเก็บไว้เผื่อใช้ sprite sheet ในอนาคต
}

export const availableSkins: SkinData[] = [
  { id: "axolotl", name: "Axolotl", spriteIndex: 0 },
  { id: "beagle", name: "Beagle", spriteIndex: 1 },
  { id: "bear", name: "Bear", spriteIndex: 2 },
  { id: "bird", name: "Bird", spriteIndex: 3 },
  { id: "capybara", name: "Capybara", spriteIndex: 4 },
  { id: "cat", name: "Cat", spriteIndex: 5 },
  { id: "elephant", name: "Elephant", spriteIndex: 6 },
  { id: "frog", name: "Frog", spriteIndex: 7 },
  { id: "giraffe", name: "Giraffe", spriteIndex: 8 },
  { id: "hippo", name: "Hippo", spriteIndex: 9 },
  { id: "hippo2", name: "Hippo2", spriteIndex: 10 },
  { id: "hyena", name: "Hyena", spriteIndex: 11 },
  { id: "owl", name: "Owl", spriteIndex: 12 },
  { id: "panda", name: "Panda", spriteIndex: 13 },
  { id: "rabbit", name: "Rabbit", spriteIndex: 14 },
  { id: "raccoon", name: "Raccoon", spriteIndex: 15 },
  { id: "rhino", name: "Rhino", spriteIndex: 16 },
  { id: "shark", name: "Shark", spriteIndex: 17 },
  { id: "sheep", name: "Sheep", spriteIndex: 18 },
  { id: "tiger", name: "Tiger", spriteIndex: 19 },
  { id: "wolf", name: "Wolf", spriteIndex: 20 },
  { id: "zebra", name: "Zebra", spriteIndex: 21 },
];
