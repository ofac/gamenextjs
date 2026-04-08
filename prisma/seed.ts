import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

  console.log('🌱 Starting seed...')

  // -----------------------------
  // 1. Clean database
  // -----------------------------

  await prisma.game.deleteMany()
  await prisma.console.deleteMany()

  console.log('🧹 Database cleaned')

  // -----------------------------
  // 2. Create Consoles
  // -----------------------------

  const consoles = await prisma.console.createMany({
    data: [
      {
        name: 'PlayStation 5',
        manufacturer: 'Sony',
        releasedate: new Date('2020-11-12'),
        description:
          'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
      },
      {
        name: 'Xbox Series X',
        manufacturer: 'Microsoft',
        releasedate: new Date('2020-11-10'),
        description:
          'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
      },
      {
        name: 'Nintendo Switch',
        manufacturer: 'Nintendo',
        releasedate: new Date('2021-10-08'),
        description:
          'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
      },
      {
        name: 'Nintendo Switch 2',
        manufacturer: 'Nintendo',
        releasedate: new Date('2025-06-05'),
        description:
          'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
      },
      {
        name: 'Steam Deck',
        manufacturer: 'Valve',
        releasedate: new Date('2023-11-16'),
        description:
          'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
      },
    ],
  })

  console.log('🎮 5 consoles seeded')

  // -----------------------------
  // 3. Get consoles from DB
  // -----------------------------

  const allConsoles = await prisma.console.findMany()

  const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
  const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
  const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch')
  const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
  const steamDeck = allConsoles.find(c => c.name === 'Steam Deck')

  // -----------------------------
  // 4. Create Games
  // -----------------------------

  const gamesData = [
  {
    title: 'God of War Ragnarök',
    developer: 'Santa Monica Studio',
    releasedate: new Date('2022-11-09'),
    price: 69.99,
    genre: 'Action-adventure',
    description: 'Kratos and Atreus must journey to each of the Nine Realms.',
    console_id: ps5?.id,
  },
  {
    title: 'Halo Infinite',
    developer: '343 Industries',
    releasedate: new Date('2021-12-08'),
    price: 59.99,
    genre: 'First-person shooter',
    description: 'Master Chief returns.',
    console_id: xbox?.id,
  },
  {
    title: 'The Legend of Zelda: TOTK',
    developer: 'Nintendo EPD',
    releasedate: new Date('2023-05-12'),
    price: 69.99,
    genre: 'Action-adventure',
    description: 'Explore Hyrule skies.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Elden Ring',
    developer: 'FromSoftware',
    releasedate: new Date('2022-02-25'),
    price: 59.99,
    genre: 'Action RPG',
    description: 'A dark fantasy RPG.',
    console_id: ps5?.id,
  },
  {
    title: 'Forza Horizon 5',
    developer: 'Playground Games',
    releasedate: new Date('2021-11-09'),
    price: 59.99,
    genre: 'Racing',
    description: 'Open world racing in Mexico.',
    console_id: xbox?.id,
  },
  {
    title: 'Pokémon Scarlet',
    developer: 'Game Freak',
    releasedate: new Date('2022-11-18'),
    price: 59.99,
    genre: 'RPG',
    description: 'Paldea adventure.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Spider-Man 2',
    developer: 'Insomniac Games',
    releasedate: new Date('2023-10-20'),
    price: 69.99,
    genre: 'Action',
    description: 'Symbiote threat.',
    console_id: ps5?.id,
  },
  {
    title: 'Starfield',
    developer: 'Bethesda',
    releasedate: new Date('2023-09-06'),
    price: 69.99,
    genre: 'RPG',
    description: 'Space exploration.',
    console_id: xbox?.id,
  },
  {
    title: 'Mario Kart 9',
    developer: 'Nintendo',
    releasedate: new Date('2025-12-01'),
    price: 59.99,
    genre: 'Racing',
    description: 'Next Mario Kart.',
    console_id: switch2?.id,
  },
  {
    title: 'Hogwarts Legacy',
    developer: 'Avalanche',
    releasedate: new Date('2023-02-10'),
    price: 59.99,
    genre: 'RPG',
    description: 'Wizarding world.',
    console_id: steamDeck?.id,
  },
  {
    title: 'Final Fantasy XVI',
    developer: 'Square Enix',
    releasedate: new Date('2023-06-22'),
    price: 69.99,
    genre: 'RPG',
    description: 'Epic fantasy story.',
    console_id: ps5?.id,
  },
  {
    title: 'Demon’s Souls',
    developer: 'Bluepoint Games',
    releasedate: new Date('2020-11-12'),
    price: 69.99,
    genre: 'Action RPG',
    description: 'Remake classic.',
    console_id: ps5?.id,
  },
  {
    title: 'Ratchet & Clank Rift Apart',
    developer: 'Insomniac Games',
    releasedate: new Date('2021-06-11'),
    price: 69.99,
    genre: 'Platform',
    description: 'Dimension hopping.',
    console_id: ps5?.id,
  },
  {
    title: 'Returnal',
    developer: 'Housemarque',
    releasedate: new Date('2021-04-30'),
    price: 59.99,
    genre: 'Roguelike',
    description: 'Sci-fi loop.',
    console_id: ps5?.id,
  },
  {
    title: 'Horizon Forbidden West',
    developer: 'Guerrilla Games',
    releasedate: new Date('2022-02-18'),
    price: 69.99,
    genre: 'Action RPG',
    description: 'Aloy returns.',
    console_id: ps5?.id,
  },
  {
    title: 'Gran Turismo 7',
    developer: 'Polyphony Digital',
    releasedate: new Date('2022-03-04'),
    price: 69.99,
    genre: 'Racing',
    description: 'Real driving simulator.',
    console_id: ps5?.id,
  },
  {
    title: 'Resident Evil 4 Remake',
    developer: 'Capcom',
    releasedate: new Date('2023-03-24'),
    price: 69.99,
    genre: 'Survival Horror',
    description: 'Reimagined horror.',
    console_id: ps5?.id,
  },
  {
    title: 'Assassin’s Creed Mirage',
    developer: 'Ubisoft',
    releasedate: new Date('2023-10-05'),
    price: 59.99,
    genre: 'Action',
    description: 'Stealth-focused AC.',
    console_id: ps5?.id,
  },
  {
    title: 'Gears 5',
    developer: 'The Coalition',
    releasedate: new Date('2019-09-10'),
    price: 39.99,
    genre: 'Shooter',
    description: 'War continues.',
    console_id: xbox?.id,
  },
  {
    title: 'Microsoft Flight Simulator',
    developer: 'Asobo Studio',
    releasedate: new Date('2020-08-18'),
    price: 59.99,
    genre: 'Simulation',
    description: 'Real world flying.',
    console_id: xbox?.id,
  },
  {
    title: 'Sea of Thieves',
    developer: 'Rare',
    releasedate: new Date('2018-03-20'),
    price: 39.99,
    genre: 'Adventure',
    description: 'Pirate sandbox.',
    console_id: xbox?.id,
  },
  {
    title: 'Fable',
    developer: 'Playground Games',
    releasedate: new Date('2025-01-01'),
    price: 69.99,
    genre: 'RPG',
    description: 'Fantasy reboot.',
    console_id: xbox?.id,
  },
  {
    title: 'Hellblade II',
    developer: 'Ninja Theory',
    releasedate: new Date('2024-05-21'),
    price: 69.99,
    genre: 'Action',
    description: 'Dark journey.',
    console_id: xbox?.id,
  },
  {
    title: 'Avowed',
    developer: 'Obsidian',
    releasedate: new Date('2024-11-01'),
    price: 69.99,
    genre: 'RPG',
    description: 'Fantasy RPG.',
    console_id: xbox?.id,
  },
  {
    title: 'State of Decay 3',
    developer: 'Undead Labs',
    releasedate: new Date('2025-01-01'),
    price: 59.99,
    genre: 'Survival',
    description: 'Zombie survival.',
    console_id: xbox?.id,
  },
  {
    title: 'Forza Motorsport',
    developer: 'Turn 10',
    releasedate: new Date('2023-10-10'),
    price: 69.99,
    genre: 'Racing',
    description: 'Track racing.',
    console_id: xbox?.id,
  },
  {
    title: 'Super Mario Odyssey',
    developer: 'Nintendo',
    releasedate: new Date('2017-10-27'),
    price: 59.99,
    genre: 'Platform',
    description: 'Mario adventure.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Animal Crossing New Horizons',
    developer: 'Nintendo',
    releasedate: new Date('2020-03-20'),
    price: 59.99,
    genre: 'Simulation',
    description: 'Island life.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Splatoon 3',
    developer: 'Nintendo',
    releasedate: new Date('2022-09-09'),
    price: 59.99,
    genre: 'Shooter',
    description: 'Ink battles.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Metroid Dread',
    developer: 'MercurySteam',
    releasedate: new Date('2021-10-08'),
    price: 59.99,
    genre: 'Action',
    description: 'Samus returns.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Luigi’s Mansion 3',
    developer: 'Next Level Games',
    releasedate: new Date('2019-10-31'),
    price: 59.99,
    genre: 'Adventure',
    description: 'Ghost hunting.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Fire Emblem Engage',
    developer: 'Intelligent Systems',
    releasedate: new Date('2023-01-20'),
    price: 59.99,
    genre: 'Strategy',
    description: 'Tactical RPG.',
    console_id: switchOLED?.id,
  },
  {
    title: 'Zelda Next Gen',
    developer: 'Nintendo',
    releasedate: new Date('2026-01-01'),
    price: 69.99,
    genre: 'Adventure',
    description: 'Next-gen Zelda.',
    console_id: switch2?.id,
  },
  {
    title: 'Super Mario Galaxy 3',
    developer: 'Nintendo',
    releasedate: new Date('2026-01-01'),
    price: 69.99,
    genre: 'Platform',
    description: 'Space Mario.',
    console_id: switch2?.id,
  },
  {
    title: 'Smash Bros Ultimate 2',
    developer: 'Nintendo',
    releasedate: new Date('2026-01-01'),
    price: 69.99,
    genre: 'Fighting',
    description: 'Fighting game.',
    console_id: switch2?.id,
  },
  {
    title: 'Cyberpunk 2077',
    developer: 'CD Projekt',
    releasedate: new Date('2020-12-10'),
    price: 49.99,
    genre: 'RPG',
    description: 'Night City.',
    console_id: steamDeck?.id,
  },
  {
    title: 'The Witcher 3',
    developer: 'CD Projekt',
    releasedate: new Date('2015-05-19'),
    price: 39.99,
    genre: 'RPG',
    description: 'Geralt adventure.',
    console_id: steamDeck?.id,
  },
  {
    title: 'Hades',
    developer: 'Supergiant Games',
    releasedate: new Date('2020-09-17'),
    price: 24.99,
    genre: 'Roguelike',
    description: 'Escape underworld.',
    console_id: steamDeck?.id,
  },
  {
    title: 'Stardew Valley',
    developer: 'ConcernedApe',
    releasedate: new Date('2016-02-26'),
    price: 14.99,
    genre: 'Simulation',
    description: 'Farming life.',
    console_id: steamDeck?.id,
  },
  {
    title: 'Red Dead Redemption 2',
    developer: 'Rockstar',
    releasedate: new Date('2018-10-26'),
    price: 59.99,
    genre: 'Action',
    description: 'Wild west.',
    console_id: steamDeck?.id,
  },
  {
    title: 'Baldur’s Gate 3',
    developer: 'Larian Studios',
    releasedate: new Date('2023-08-03'),
    price: 59.99,
    genre: 'RPG',
    description: 'Deep RPG.',
    console_id: steamDeck?.id,
  },
]

  for (const game of gamesData) {
    if (!game.console_id) continue

    await prisma.game.create({
      data: game,
    })
  }

  console.log('🕹️ 41 games seeded')
  console.log('✅ Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })