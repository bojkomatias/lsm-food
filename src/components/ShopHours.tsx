import type { ShopHours } from "@/db/schema/shop-hours";
import { Clock } from "./icons";

const getToday = new Date().getDay();

export function ShopHours({ shopHours }: { shopHours: ShopHours[] }) {
  const today = shopHours.find((e) => e.day === getToday);
  return (
    <div className="mt-2 flex items-center gap-1">
      <Clock />
      <span className="text-xs text-muted-foreground">
        {today ? (
          <>
            abierto de{" "}
            <span className="font-medium text-card-foreground">
              {today.opens}
            </span>{" "}
            a{" "}
            <span className="font-medium text-card-foreground">
              {today.closes}
            </span>
          </>
        ) : (
          <>hoy cerrado</>
        )}
      </span>
    </div>
  );
}
