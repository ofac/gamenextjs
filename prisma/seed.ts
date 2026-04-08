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
  // 1. Limpiar base de datos
  // -----------------------------
  await prisma.game.deleteMany()
  await prisma.console.deleteMany()
  console.log('🧹 Database cleaned')

  // -----------------------------
  // 2. Crear Consolas
  // -----------------------------
  await prisma.console.createMany({
    data: [
      { name: 'PlayStation 5', manufacturer: 'Sony', releasedate: new Date('2020-11-12'), description: 'The PS5 brings 4K gaming at 120Hz.' },
      { name: 'Xbox Series X', manufacturer: 'Microsoft', releasedate: new Date('2020-11-10'), description: 'High-performance console with 12 TFLOPS.' },
      { name: 'Nintendo Switch', manufacturer: 'Nintendo', releasedate: new Date('2021-10-08'), description: 'Hybrid console with OLED screen.' },
      { name: 'Nintendo Switch 2', manufacturer: 'Nintendo', releasedate: new Date('2025-06-05'), description: 'The successor with magnetic Joy-cons.' },
      { name: 'Steam Deck', manufacturer: 'Valve', releasedate: new Date('2023-11-16'), description: 'Handheld gaming computer.' },
    ],
  })
  console.log('🎮 Consoles seeded')

  // -----------------------------
  // 3. Obtener IDs de Consolas
  // -----------------------------
  const allConsoles = await prisma.console.findMany()

  // Función auxiliar para evitar errores de tipo 'undefined'
  const getConsoleId = (name: string): number => {
    const found = allConsoles.find(c => c.name === name)
    if (!found) throw new Error(`Error: No se encontró la consola ${name} en la DB.`)
    return found.id
  }

  // -----------------------------
  // 4. Preparar Datos de Juegos
  // -----------------------------
  const gamesData = [
    { title: 'God of War Ragnarök', developer: 'Santa Monica Studio', releasedate: new Date('2022-11-09'), price: 69.99, genre: 'Action-adventure', description: 'Kratos and Atreus journey.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Halo Infinite', developer: '343 Industries', releasedate: new Date('2021-12-08'), price: 59.99, genre: 'First-person shooter', description: 'Master Chief returns.', console_id: getConsoleId('Xbox Series X') },
    { title: 'The Legend of Zelda: TOTK', developer: 'Nintendo EPD', releasedate: new Date('2023-05-12'), price: 69.99, genre: 'Action-adventure', description: 'Explore Hyrule skies.', console_id: getConsoleId('Nintendo Switch') },
    { title: 'Elden Ring', developer: 'FromSoftware', releasedate: new Date('2022-02-25'), price: 59.99, genre: 'Action RPG', description: 'A dark fantasy RPG.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Forza Horizon 5', developer: 'Playground Games', releasedate: new Date('2021-11-09'), price: 59.99, genre: 'Racing', description: 'Open world racing in Mexico.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Pokémon Scarlet', developer: 'Game Freak', releasedate: new Date('2022-11-18'), price: 59.99, genre: 'RPG', description: 'Paldea adventure.', console_id: getConsoleId('Nintendo Switch') },
    { title: 'Spider-Man 2', developer: 'Insomniac Games', releasedate: new Date('2023-10-20'), price: 69.99, genre: 'Action', description: 'Symbiote threat.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Starfield', developer: 'Bethesda', releasedate: new Date('2023-09-06'), price: 69.99, genre: 'RPG', description: 'Space exploration.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Mario Kart 9', developer: 'Nintendo', releasedate: new Date('2025-12-01'), price: 59.99, genre: 'Racing', description: 'Next Mario Kart.', console_id: getConsoleId('Nintendo Switch 2') },
    { title: 'Hogwarts Legacy', developer: 'Avalanche', releasedate: new Date('2023-02-10'), price: 59.99, genre: 'RPG', description: 'Wizarding world.', console_id: getConsoleId('Steam Deck') },
    { title: 'Final Fantasy XVI', developer: 'Square Enix', releasedate: new Date('2023-06-22'), price: 69.99, genre: 'RPG', description: 'Epic fantasy story.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Demon’s Souls', developer: 'Bluepoint Games', releasedate: new Date('2020-11-12'), price: 69.99, genre: 'Action RPG', description: 'Remake classic.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Ratchet & Clank Rift Apart', developer: 'Insomniac Games', releasedate: new Date('2021-06-11'), price: 69.99, genre: 'Platform', description: 'Dimension hopping.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Returnal', developer: 'Housemarque', releasedate: new Date('2021-04-30'), price: 59.99, genre: 'Roguelike', description: 'Sci-fi loop.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Horizon Forbidden West', developer: 'Guerrilla Games', releasedate: new Date('2022-02-18'), price: 69.99, genre: 'Action RPG', description: 'Aloy returns.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Gran Turismo 7', developer: 'Polyphony Digital', releasedate: new Date('2022-03-04'), price: 69.99, genre: 'Racing', description: 'Real driving simulator.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Resident Evil 4 Remake', developer: 'Capcom', releasedate: new Date('2023-03-24'), price: 69.99, genre: 'Survival Horror', description: 'Reimagined horror.', console_id: getConsoleId('PlayStation 5') },
    { title: 'Gears 5', developer: 'The Coalition', releasedate: new Date('2019-09-10'), price: 39.99, genre: 'Shooter', description: 'War continues.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Microsoft Flight Simulator', developer: 'Asobo Studio', releasedate: new Date('2020-08-18'), price: 59.99, genre: 'Simulation', description: 'Real world flying.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Sea of Thieves', developer: 'Rare', releasedate: new Date('2018-03-20'), price: 39.99, genre: 'Adventure', description: 'Pirate sandbox.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Fable', developer: 'Playground Games', releasedate: new Date('2025-01-01'), price: 69.99, genre: 'RPG', description: 'Fantasy reboot.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Hellblade II', developer: 'Ninja Theory', releasedate: new Date('2024-05-21'), price: 69.99, genre: 'Action', description: 'Dark journey.', console_id: getConsoleId('Xbox Series X') },
    { title: 'Avowed', developer: 'Obsidian', releasedate: new Date('2024-11-01'), price: 69.99, genre: 'RPG', description: 'Fantasy RPG.', console_id: getConsoleId('Xbox Series X') },
    { title: 'State of Decay 3', developer: 'Undead Labs', releasedate: new Date('2025-01-01'), price: 59.99, genre: 'Survival', description: 'Zombie survival.', console_id: getConsoleId('Xbox Series X') }
  ]

  // -----------------------------
  // 5. Insertar Juegos
  // -----------------------------
  console.log(`🚀 Inserting ${gamesData.length} games...`)
  
  for (const game of gamesData) {
    await prisma.game.create({
      data: game,
    })
  }

  console.log('✅ Seed finished successfully')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
