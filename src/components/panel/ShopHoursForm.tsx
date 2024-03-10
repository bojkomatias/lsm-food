"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { insertShopHoursSchema } from "@/db/schema/shop-hours";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RemoveLine } from "../icons";
import { upsertBusinessHours } from "@/actions/shopHours";

export function ShopHoursForm({ shop }: { shop: number }) {
  const form = useForm<z.infer<typeof insertShopHoursSchema>>({
    resolver: zodResolver(insertShopHoursSchema),
    defaultValues: { shopHours: [] },
  });
  const { fields, append, remove } = useFieldArray({
    name: "shopHours",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof insertShopHoursSchema>) {
    const res = await upsertBusinessHours(values.shopHours);
    console.log(res);
  }
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>Edita tus horarios</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit. Unde explicabo beatae quam nesciunt
          perspiciatis, aliquam aspernatur modi quia? Deserunt porro aliquam
          nihil!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors, form.getValues()),
          )}
        >
          <CardContent className="flex flex-col items-center">
            <div className="w-full space-y-4 divide-y">
              {fields.map((f, index) => (
                <div key={f.id} className="sm:flex sm:gap-px">
                  <FormField
                    control={form.control}
                    name={`shopHours.${index}.shop`}
                    render={() => (
                      <Input
                        type="hidden"
                        defaultValue={1}
                        {...form.register(`shopHours.${index}.shop`)}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`shopHours.${index}.day`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel className="capitalize">Día</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          {...form.register(`shopHours.${index}.day`)}
                        >
                          <FormControl>
                            <SelectTrigger className="max-w-sm">
                              <SelectValue placeholder="Seleccione un día" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Domingo</SelectItem>
                            <SelectItem value="1">Lunes</SelectItem>
                            <SelectItem value="2">Martes</SelectItem>
                            <SelectItem value="3">Miércoles</SelectItem>
                            <SelectItem value="4">Jueves</SelectItem>
                            <SelectItem value="5">Viérnes</SelectItem>
                            <SelectItem value="6">Sábado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-grow items-end gap-px">
                    <FormField
                      control={form.control}
                      name={`shopHours.${index}.opens`}
                      render={() => (
                        <FormItem className="flex-grow">
                          <FormLabel>Abre</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...form.register(`shopHours.${index}.opens`)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`shopHours.${index}.closes`}
                      render={() => (
                        <FormItem className="flex-grow">
                          <FormLabel>Cierra</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...form.register(`shopHours.${index}.closes`)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => remove(index)}
                    >
                      <RemoveLine />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-3"
              onClick={() =>
                append([
                  { shop: shop, day: 2, opens: "16:00", closes: "20:00" },
                ])
              }
              variant={"secondary"}
            >
              Agregar horario
            </Button>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="col-span-full place-self-end">
              Guardar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
