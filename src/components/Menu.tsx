import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "DASHBOARD",
    items: [
      {
        icon: "/dashboard-basic.png",
        label: "Basic",
        href: "/basic",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      {
        icon: "/master-farmer.png",
        label: "Farmer",
        href: "/list/farmers",
        visible: ["admin"],
      },
      {
        icon: "/master-plot.png",
        label: "Plot",
        href: "/list/plots",
        visible: ["admin"],
      },
      {
        icon: "/master-ics.png",
        label: "ICS",
        href: "/list/icss",
        visible: ["admin"],
      },
      {
        icon: "/dashboard-basic.png",
        label: "Trainimg",
        href: "/list/trainings",
        visible: ["admin"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map(i=>(
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
          {
            i.items.map(item=>(
              <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2">
                <Image src={item.icon} alt={item.label} width={20} height={20}/>
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            ))
          }
        </div>
      ))}
    </div>
  )
}

export default Menu