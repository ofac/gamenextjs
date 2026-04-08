import { PrismaClient }          from '@/app/generated/prisma';
import { PrismaNeon }            from '@prisma/adapter-neon';
import PlusIconCustom            from '../icons/PlusIcon';
import MagnifyingGlassIconCustom from '../icons/MagnifyingGlassIcon';
import PencilSimpleIconCustom    from '../icons/PencilSimpleIcon';
import ComputerTowerIconCustom  from '../icons/ComputerTowerIcon';
import Link                     from 'next/link';
import DeleteConsoleButton      from './DeleteConsoleButton';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!
  })
})

const manufacturerColors:any = {
  "Nintendo":  "badge-error", 
  "Microsoft": "badge-success",    
  "Sony":      "badge-info", 
  "Valve":     "badge-ghost"         
};

export default async function IndexConsoles() {
  const consoles = await prisma.console.findMany({
    orderBy: { releasedate: 'desc' }
  })

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      {/* header - - - */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex gap-2">
           <ComputerTowerIconCustom />
           Console Manager
        </h1>

        <Link href="consoles/add/"
              className="btn btn-outline btn-success">
          <PlusIconCustom />
          Add Console
        </Link>
        
      </div>

      {/* table - - - */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Console</th>
              <th className='hidden md:table-cell'>Manufacturer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {consoles.map((console) => (
              <tr key={console.id} className='even:bg-white/5'>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-18">
                        <img src={'imgs/'+console.image} alt={console.name}/>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {console.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold hidden md:table-cell">
                  <span className={`badge badge-outline ${manufacturerColors[console.manufacturer] || 'badge-ghost'}`}>
                    {console.manufacturer}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <Link href={`/consoles/show/${console.id}`} className="btn btn-xs btn-outline btn-default">
                      <MagnifyingGlassIconCustom />
                    </Link>

                    <Link  href={`/consoles/edit/${console.id}`} className="btn btn-xs btn-outline btn-default">
                      <PencilSimpleIconCustom />
                    </Link>

                    <DeleteConsoleButton console={{ id: console.id, name: console.name }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}