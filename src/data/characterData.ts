import { Character, GeneratorOptions, Stats } from '../types';

export const CLASSES = [
  {
    name: 'Warrior',
    icon: 'Sword',
    primaryStat: 'str',
    color: 'from-amber-600 to-red-700',
    weapons: ['Greatsword of the Lion', 'Battleaxe of the Northern Peaks', 'Warhammer & Tower Shield', 'Dual Longswords'],
    armors: ['Full Plate Armor', 'Chainmail & Heavy Pauldrons', 'Reinforced Scale Mail'],
    description: 'A master of martial combat, skilled with weapons and armored defense.'
  },
  {
    name: 'Mage',
    icon: 'WandSparkles',
    primaryStat: 'int',
    color: 'from-blue-600 to-indigo-800',
    weapons: ['Arcane Staff of Whispering Stars', 'Crystal Focus Dagger', 'Grimoire of Eldritch Fire'],
    armors: ['Enchanted Silk Robes', 'Robe of Archmage Protection', 'Rune-embroidered Vestments'],
    description: 'A scholarly spellcaster capable of manipulating elemental energy and reality.'
  },
  {
    name: 'Rogue',
    icon: 'Dagger',
    primaryStat: 'dex',
    color: 'from-emerald-600 to-teal-800',
    weapons: ['Shadow-kissed Stiletto', 'Twin Serrated Daggers', 'Recurve Shortbow & Venom Vials'],
    armors: ['Studded Leather Armor', 'Shadow-cloak Leathers', 'Darkwing Padded Vest'],
    description: 'A scoundrel who uses stealth, precision strike, and agility to overcome obstacles.'
  },
  {
    name: 'Paladin',
    icon: 'Shield',
    primaryStat: 'str',
    color: 'from-yellow-500 to-amber-700',
    weapons: ['Radiant Sunblade', 'Blessed Halberd of Dawn', 'Warhammer of the Holy Order'],
    armors: ['Gilded Sovereign Plate', 'Blessed Silver Mail', 'Sacred Dragonscale Armor'],
    description: 'A holy warrior bound by a sacred oath to smite evil and uphold justice.'
  },
  {
    name: 'Cleric',
    icon: 'Cross',
    primaryStat: 'wis',
    color: 'from-sky-500 to-cyan-700',
    weapons: ['Mace of Divine Grace', 'Scepter of the Dawnbringer', 'Morningstar of Sunfire'],
    armors: ['Hallowed Chainmail', 'Vestments of the Celestial Warden', 'Blessed Shield & Mail'],
    description: 'A priestly champion who wields divine magic in service of a higher power.'
  },
  {
    name: 'Ranger',
    icon: 'Trees',
    primaryStat: 'dex',
    color: 'from-lime-600 to-emerald-800',
    weapons: ['Yew Longbow of the Deep Woods', 'Twin Hunter Scimitars', 'Crossbow of Windstrider'],
    armors: ['Wilderness Hide Armor', 'Leaf-weave Leather', 'Camouflage Cloak & Brigandine'],
    description: 'A warrior of the wilderness who hunts prey with unmatched tracking and marksmanship.'
  },
  {
    name: 'Bard',
    icon: 'Music',
    primaryStat: 'cha',
    color: 'from-purple-600 to-pink-700',
    weapons: ['Silver-strung Lute Dagger', 'Rapier of Echoing Chords', 'Spellbound Flute Rapier'],
    armors: ['Fine Velvet Doublet', 'Glamoured Leather Vest', 'Minstrel’s Travelling Cloak'],
    description: 'An inspiring performer whose music and charm weave ancient arcana.'
  },
  {
    name: 'Warlock',
    icon: 'Flame',
    primaryStat: 'cha',
    color: 'from-violet-700 to-fuchsia-900',
    weapons: ['Eldritch Rod of the Deep Void', 'Obsidian Ritual Blade', 'Scepter of Forgotten Gods'],
    armors: ['Shadow-infused Robes', 'Pact-bound Leather Armor', 'Cursed Dragon-hide Vest'],
    description: 'A wielder of magic derived from a bargain with an otherworldly patron.'
  },
  {
    name: 'Druid',
    icon: 'Leaf',
    primaryStat: 'wis',
    color: 'from-green-600 to-emerald-900',
    weapons: ['Ironwood Staff of the Oak', 'Sickle of the Crescent Moon', 'Totemic Wooden Spear'],
    armors: ['Hide Armor of the Beast', 'Barkskin Harness', 'Living Vines Robe'],
    description: 'A guardian of nature who channels primordial elemental forces and turns into beasts.'
  },
  {
    name: 'Monk',
    icon: 'Zap',
    primaryStat: 'dex',
    color: 'from-orange-500 to-amber-700',
    weapons: ['Wraps of the Iron Fist', 'Dragon-head Quarterstaff', 'Wind-blade Nunchaku'],
    armors: ['Unarmored Ascetic Garb', 'Monastery Silk Wrap', 'Bandages of the Four Winds'],
    description: 'A master of martial arts who harnesses internal ki energy to strike with fury.'
  },
  {
    name: 'Necromancer',
    icon: 'Skull',
    primaryStat: 'int',
    color: 'from-slate-700 to-zinc-900',
    weapons: ['Scythe of Soul Harvest', 'Bone Staff of the Lich', 'Grimoire of Shadow Spells'],
    armors: ['Death-shroud Robes', 'Bone-gilded Mantle', 'Crypt Keepers Shroud'],
    description: 'A practitioner of dark magic manipulating life force, souls, and the undead.'
  },
  {
    name: 'Barbarian',
    icon: 'Axe',
    primaryStat: 'str',
    color: 'from-red-600 to-orange-800',
    weapons: ['Greataxe of Savage Fury', 'Dual Heavy Cleavers', 'Greatclub of the Thunder Bear'],
    armors: ['Beast Pelt Harness', 'Dragon Bone Shoulder Guard', 'Unarmored Tribal Tattoos'],
    description: 'A fierce warrior of primal rage who thrives in the heat of battle.'
  }
];

export const RACES = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Stout Halfling',
  'Half-Orc',
  'Tiefling',
  'Dragonborn',
  'Forest Gnome',
  'Half-Elf'
];

export const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Chaotic Evil'
];

export const FIRST_NAMES = [
  'Aethelgard', 'Alden', 'Aria', 'Balthazar', 'Brangwen', 'Cassian', 'Caelum', 'Darian',
  'Eldrin', 'Elowen', 'Faelan', 'Gideon', 'Gwenevere', 'Hadrian', 'Ignis', 'Isolde',
  'Jorund', 'Kaelen', 'Lyra', 'Mirella', 'Nethis', 'Orion', 'Pytheas', 'Quinlan',
  'Rowan', 'Soren', 'Thalia', 'Uther', 'Valerius', 'Vespera', 'Wynne', 'Xander',
  'Yvaine', 'Zephyr', 'Thorne', 'Kaeda', 'Kaelen', 'Brimstone', 'Rorik', 'Morrigan'
];

export const LAST_NAMES = [
  'Blackwood', 'Stormbringer', 'Sunstrider', 'Ironfist', 'Frostweaver', 'Shadowfen',
  'Oakhaven', 'Dragonbane', 'Silverwing', 'Valerius', 'Dawnseeker', 'Ravenclaw',
  'Nightshade', 'Stonebreaker', 'Starling', 'Vanguard', 'Ashford', 'Thunderhorn',
  'Wildrunner', 'Bloodmoon', 'Grimspire', 'Lightbringer', 'Gravewalker', 'Swiftfoot'
];

export const EPITHETS = [
  'the Brave', 'the Wise', 'the Shadow', 'the Unbroken', 'the Silent', 'the Flamekeeper',
  'the Wanderer', 'the Oathbreaker', 'the Dragon-Slayer', 'the Stormborn', 'the Iron-Willed',
  'the Spellweaver', 'the Swift', 'the Undying', 'the Lost Prince', 'the Star-Gazer'
];

export const TRAITS = [
  'Unflinching Courage in the Face of Terrors',
  'Photographic Memory for Ancient Runes & Maps',
  'Speaks Fluent Beast-tongue and Sylvan',
  'Never Refuses a Duel of Honor',
  'Always Carries a Lucky Loaded Die',
  'Senses Imminent Magical Traps by a Tingling Sensation',
  'Can Sleep Anywhere, Even Amidst Chaos',
  'Refuses to Harm Feline Creatures',
  'Keeps a Meticulous Journal of Monster Flaws',
  'Possesses a Third Eye Tattoo that Glows in total Darkness'
];

export const BACKSTORY_TEMPLATE_PARTS = {
  origins: [
    'Born in a secluded mountain village destroyed by dragons,',
    'Exiled from a high royal court following a treasonous conspiracy,',
    'Raised by a guild of secretive scholars in an underground library,',
    'Trained from childhood in an ancient monastery atop a stormy peak,',
    'A former mercenary captain seeking redemption for past bloodshed,',
    'Discovered in a glowing meteor crater surrounded by whispering ruins,',
    'Orphaned in the slums of a bustling merchant port city,',
    'Awakened from a century-long magical stasis with fragmented memories,',
    'Bound by an ancient blood pact forged by their ancestors,'
  ],
  drives: [
    'they now search the continent for a lost artifact capable of sealing the nether rift.',
    'they travel in search of their missing twin, guided only by cryptic dreams.',
    'their sole motivation is to restore honor to a fallen lineage.',
    'they seek the secret to immortal life to save their ailing homeland.',
    'they wander from tavern to dungeon, earning coin and forging legendary tales.',
    'they carry a cursed compass that points toward ancient forgotten treasures.',
    'they vow to eradicate the shadow cult that haunted their youth.',
    'they follow the call of an ancient celestial deity to restore balance to the realm.'
  ]
};

export function generateProceduralBackstory(characterClass?: string, race?: string): string {
  const origin = getRandomItem(BACKSTORY_TEMPLATE_PARTS.origins);
  const drive = getRandomItem(BACKSTORY_TEMPLATE_PARTS.drives);
  return `${origin} ${drive}`;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateStatsForClass(primaryStat: string): Stats {
  const stats: Stats = {
    str: getRandomNumber(8, 14),
    dex: getRandomNumber(8, 14),
    con: getRandomNumber(10, 16),
    int: getRandomNumber(8, 14),
    wis: getRandomNumber(8, 14),
    cha: getRandomNumber(8, 14),
  };

  // Boost primary stat to make stats feel class-appropriate (15 - 18)
  if (primaryStat in stats) {
    stats[primaryStat as keyof Stats] = getRandomNumber(15, 18);
  }

  return stats;
}

export function generateRandomCharacter(options: GeneratorOptions = { lockedClass: null, lockedRace: null }): Character {
  const chosenClassObj = options.lockedClass 
    ? CLASSES.find(c => c.name === options.lockedClass) || getRandomItem(CLASSES)
    : getRandomItem(CLASSES);

  const race = options.lockedRace || getRandomItem(RACES);
  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const epithet = Math.random() > 0.4 ? ` ${getRandomItem(EPITHETS)}` : '';
  const fullName = `${firstName} ${lastName}${epithet}`;
  
  const alignment = getRandomItem(ALIGNMENTS);
  const stats = generateStatsForClass(chosenClassObj.primaryStat);
  const strength = stats.str;
  const health = getRandomNumber(120, 240) + stats.con * 4;
  const mana = chosenClassObj.primaryStat === 'int' || chosenClassObj.primaryStat === 'wis' || chosenClassObj.primaryStat === 'cha'
    ? getRandomNumber(100, 220) + stats.int * 5
    : getRandomNumber(30, 90) + stats.int * 3;

  const weapon = getRandomItem(chosenClassObj.weapons);
  const armor = getRandomItem(chosenClassObj.armors);
  const trait = getRandomItem(TRAITS);

  const origin = getRandomItem(BACKSTORY_TEMPLATE_PARTS.origins);
  const drive = getRandomItem(BACKSTORY_TEMPLATE_PARTS.drives);
  const backstory = `${origin} ${drive}`;

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: fullName,
    title: `${race} ${chosenClassObj.name}`,
    characterClass: chosenClassObj.name,
    race,
    alignment,
    level: getRandomNumber(1, 5),
    health,
    mana,
    strength,
    stats,
    weapon,
    armor,
    trait,
    backstory,
    avatarGradient: chosenClassObj.color,
    iconName: chosenClassObj.icon,
    createdAt: Date.now()
  };
}
