import { PrismaClient }          from '@/app/generated/prisma';
import { PrismaNeon }            from '@prisma/adapter-neon';
import JoystickIconCustom        from '../icons/JoystickIcon';
import PlusIconCustom            from '../icons/PlusIcon';
import MagnifyingGlassIconCustom from '../icons/MagnifyingGlassIcon';
import PencilSimpleIconCustom    from '../icons/PencilSimpleIcon';
import Link                      from "next/link";
import SearchInput               from './SearchInput';
import DeleteGameButton          from './DeleteGameButton';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!
  })
})

export default async function IndexGames({ page = 1, search, consoleFilter }: { page: number, search: string, consoleFilter: string; }) {
  const take = 12; 
  const skip = (page - 1) * take;

  const consoles = await prisma.console.findMany({ orderBy: { name: "asc" } });

  const consoleColors: any = {
    "Nintendo Switch":   "badge-error",
    "Nintendo Switch 2": "badge-error",
    "Xbox Series X":     "badge-success",
    "PlayStation 5":     "badge-info",
    "Steam Deck":        "badge-ghost",
  };

  const where: any = {
    ...(search        ? { title:   { contains: search, mode: "insensitive" } } : {}),
    ...(consoleFilter ? { console: { name: consoleFilter } }                   : {}),
  };

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where,
      include: { console: true },
      orderBy: [
        { id: "desc" },
      ],
      skip,
      take,
    }),
    prisma.game.count({ where }),
  ]);

  const totalPages = Math.ceil(total / take);

  function buildHref(params: { page?: number; console?: string }) {
    const sp = new URLSearchParams();
    if (search)                         sp.set("search",  search);
    if (params.console !== undefined)   sp.set("console", params.console);
    else if (consoleFilter)             sp.set("console", consoleFilter);
    sp.set("page", String(params.page ?? 1));
    return `?${sp.toString()}`;
  }

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      {/* header - - - */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex gap-2">
           <JoystickIconCustom />
           Game Manager
        </h1>

        <Link href="games/add/"
              className="btn btn-outline btn-success">
          <PlusIconCustom />
          Add Game
        </Link>
      </div>

      <div className="flex justify-center items-center mb-8"> 
        <SearchInput />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Link
          href={buildHref({ page: 1, console: "" })}
          className={`badge badge-outline badge-xs cursor-pointer ${!consoleFilter ? "badge-neutral" : ""}`}
        >
          All
        </Link>

        {consoles.map((c) => (
          <Link
            key={c.id}
            href={buildHref({ page: 1, console: c.name })}
            className={`badge badge-outline badge-xs cursor-pointer ${
              consoleColors[c.name] || "badge-ghost"
            } ${consoleFilter === c.name ? "badge-active opacity-100" : "opacity-60"}`}
          >
            {c.name}
          </Link>
        ))}
      </div>



      {/* table - - - */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Game</th>
              <th className='hidden md:table-cell'>Console</th>
              <th className='hidden md:table-cell'>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

          {games.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <div className="text-center py-10 flex flex-col items-center gap-2">
                  
                  <span className="text-lg font-semibold">
                    No games found
                  </span>

                  {search && (
                    <span className="text-sm opacity-60">
                      No results for "{search}"
                    </span>
                  )}

                </div>
              </td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game.id} className='even:bg-white/5'>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-18">
                        <img src={'imgs/'+game.cover} alt={game.title}/>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {game.title}
                      </div>
                      <div className="text-sm opacity-50">
                        {game.developer}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold hidden md:table-cell">
                  <span className={`badge badge-outline ${consoleColors[game.console.name] || 'badge-ghost'}`}>
                    {game.console.name}
                  </span>
                </td>
                <td className="font-semibold hidden md:table-cell">
                  ${game.price}
                </td>
                <td>
                  <div className="flex gap-1">
                    <Link href={`/games/show/${game.id}`} className="btn btn-xs btn-outline btn-default">
                      <MagnifyingGlassIconCustom />
                    </Link>

                    <Link  href={`/games/edit/${game.id}`} className="btn btn-xs btn-outline btn-default">
                      <PencilSimpleIconCustom />
                    </Link>

                    <DeleteGameButton game={{ id: game.id, title: game.title }} />
                  </div>
                </td>
              </tr>
            ))
          )}

          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className="flex justify-center py-4">
                  <div className="join">

                    {/* prev */}
      <Link
        href={page > 1 ? buildHref({ page: page - 1 }) : "#"}
        className={`join-item btn ${page <= 1 ? "btn-disabled pointer-events-none" : ""}`}
      >«</Link>

      {/* pages */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <Link
            key={p}
            href={buildHref({ page: p })}
            className={`join-item btn ${p === page ? "btn-active" : ""}`}
          >
            {p}
          </Link>
        );
      })}

      {/* next */}
      <Link
        href={page < totalPages ? buildHref({ page: page + 1 }) : "#"}
        className={`join-item btn ${page >= totalPages ? "btn-disabled pointer-events-none" : ""}`}
      >»</Link>
                    

                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}