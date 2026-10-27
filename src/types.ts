export interface Stats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: string;
  race: string;
  alignment: string;
  level: number;
  health: number;
  mana: number;
  strength: number;
  stats: Stats;
  weapon: string;
  armor: string;
  trait: string;
  backstory: string;
  avatarGradient: string;
  iconName: string;
  portraitUrl?: string;
  createdAt: number;
}

export interface GeneratorOptions {
  lockedClass: string | null;
  lockedRace: string | null;
}
