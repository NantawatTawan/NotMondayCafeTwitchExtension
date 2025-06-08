export interface Skin {
  id: string;
  name: string;
  spriteIndex: number;
  imageUrl: string;
  nameForUrl?: string;
}

export const availableSkins: Skin[] = [
  { id: "axolotl", name: "Axolotl" },
  { id: "beagle", name: "Beagle" },
  { id: "bear", name: "Bear" },
  { id: "bird", name: "Bird" },
  { id: "capybara", name: "Capybara" },
  { id: "cat", name: "Cat" },
  { id: "elephant", name: "Elephant" },
  { id: "frog", name: "Frog" },
  { id: "giraffe", name: "Giraffe" },
  { id: "hippo", name: "Hippo" },
  {
    id: "hippo2",
    name: "Hippo2",
    imageUrl:
      "https://cdn.bixmy.party/Customer/Character_Customer_Hippo2_Idle.png",
  },
  { id: "hyena", name: "Hyena" },
  { id: "owl", name: "Owl" },
  { id: "panda", name: "Panda" },
  { id: "rabbit", name: "Rabbit" },
  { id: "raccoon", name: "Raccoon" },
  { id: "rhino", name: "Rhino" },
  { id: "shark", name: "Shark" },
  { id: "sheep", name: "Sheep" },
  { id: "tiger", name: "Tiger" },
  { id: "wolf", name: "Wolf" },
  { id: "zebra", name: "Zebra" },
].map((skin, index) => ({
  ...skin,
  spriteIndex: index,
  imageUrl:
    skin.imageUrl ||
    `https://cdn.bixmy.party/Customer/Character_Customer_${skin.name}1_Idle.png`,
})) as Skin[];
