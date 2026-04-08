import { PrismaClient } from "@/app/generated/prisma";
import { PrismaNeon }   from "@prisma/adapter-neon";
import Chart            from "./Chart";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export default async function DashboardContent() {
  const consoles = await prisma.console.findMany({
    include: { games: true },
  });

  const games         = await prisma.game.findMany();
  const totalGames    = games.length;
  const totalConsoles = consoles.length;

  const pieData = consoles.map((c) => ({
    name: c.name,
    gamesCount: c.games.length,
  }));

  const yearMap: Record<string, { count: number; totalPrice: number }> = {};

  games.forEach((game) => {
    const year = new Date(game.releasedate).getFullYear().toString();

    if (!yearMap[year]) {
      yearMap[year] = { count: 0, totalPrice: 0 };
    }

    yearMap[year].count += 1;
    yearMap[year].totalPrice += game.price;
  });

  const yearData = Object.entries(yearMap).map(([year, data]) => ({
    year,
    count: data.count,
    totalPrice: Number(data.totalPrice.toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Total Consoles</div>
          <div className="stat-value">{totalConsoles}</div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">Total Games</div>
          <div className="stat-value">{totalGames}</div>
        </div>
      </div>

      {/* Charts */}
      <Chart pieData={pieData} yearData={yearData} />
    </div>
  );
}