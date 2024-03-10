import { PageTitle } from "@/components/PageTitle";
import {
  Phone,
  CameraSquare,
  MapPoint,
  Clock,
  Tag,
  Cup,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const shopHours = [
  {
    shop: 1,
    day: 0,
    opens: "17:00",
    closes: "22:00",
    createdAt: "2023-10-02 02:29:30",
    updatedAt: "2023-10-02 02:29:30",
  },
  {
    shop: 1,
    day: 2,
    opens: "23:12",
    closes: "12:22",
    createdAt: "2023-10-02 02:29:30",
    updatedAt: "2023-10-02 02:29:30",
  },
  {
    shop: 1,
    day: 3,
    opens: "19:00",
    closes: "21:00",
    createdAt: "2023-10-02 02:29:30",
    updatedAt: "2023-10-02 02:29:30",
  },
  {
    shop: 1,
    day: 5,
    opens: "12:33",
    closes: "21:43",
    createdAt: "2023-10-02 02:29:30",
    updatedAt: "2023-10-02 02:29:30",
  },
];

export default function AppPage() {
  return (
    <>
      <PageTitle title="Locales" />

      <ScrollArea className="h-[85svh] py-1">
        <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:space-y-0 lg:px-4">
          <AppShop />
          <AppShop />
          <AppShop />
        </div>
      </ScrollArea>
    </>
  );
}

function AppShop() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Sir Paneee</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          consectetur.
        </CardDescription>
      </CardHeader>
      <CardContent className="uppercase">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <div className="flex gap-1">
            <Phone />
            <span className="text-xs text-muted-foreground">+343424304</span>
          </div>
          <div className="flex gap-1">
            <CameraSquare />
            <span className="text-xs text-muted-foreground">matubojko</span>
          </div>
          <div className="flex gap-1">
            <MapPoint />
            <span className="text-xs text-muted-foreground">J.S. Bach 285</span>
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          <Cup />
          <span className="text-xs text-muted-foreground">
            Take away, Delivery
          </span>
        </div>
        <div className="mt-3 flex max-w-sm gap-1">
          <Tag className="shrink-0" />
          <span className="text-xs text-muted-foreground">
            Pizzas, Hamburguesas, Tacos, Helados, Cafeteria, Postres,
            Panificados, Bebidas
          </span>
        </div>
        <AppShopHours />
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-1">
        <Button asChild>
          <Link href={`/app/${1}`}>Editar datos</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function AppShopHours() {
  return (
    <div className="-mx-2 mt-2 rounded bg-muted px-2 pb-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Clock />{" "}
          <span className="text-xs text-muted-foreground">Horarios:</span>
        </div>
        <Button
          asChild
          size={"sm"}
          variant={"link"}
          className="capitalize opacity-75 hover:opacity-100"
        >
          <Link href={`/app/${1}/hours`}>Modificar</Link>
        </Button>
      </div>
      <div className="pl-5 text-xs text-muted-foreground">
        {shopHours.map((sh) => (
          <div key={sh.createdAt}>
            {days[sh.day]}: {"  " + sh.opens + " - " + sh.closes}
          </div>
        ))}
      </div>
    </div>
  );
}
