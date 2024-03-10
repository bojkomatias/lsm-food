"use client";

import { insertShopSchema } from "@/db/schema/shops";
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
import { useForm } from "react-hook-form";

import { ToggleGroupItem, ToggleGroup } from "../ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { usePathname } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

export function ShopForm() {
  const isAdmin = usePathname().startsWith("/admin");

  const form = useForm<z.infer<typeof insertShopSchema>>({
    resolver: zodResolver(insertShopSchema),
    defaultValues: { owner: 1 },
  });

  function onSubmit(values: z.infer<typeof insertShopSchema>) {
    console.log(values);
  }
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          {isAdmin ? "Editar local como administrador" : "Edita tu local"}
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit. Unde explicabo beatae quam nesciunt
          perspiciatis, aliquam aspernatur modi quia? Deserunt porro aliquam
          nihil!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-6 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-4 sm:col-span-2">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Matu burgers" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full sm:col-span-4">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Mi local blah..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-3 sm:col-span-2">
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input placeholder="Mi local blah..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="col-span-3 sm:col-span-2">
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="@matibojko" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-3 sm:col-span-2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Bach 285" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modality"
              render={({ field }) => (
                <FormItem className="col-span-full sm:col-span-3">
                  <FormLabel>Modalidad</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant={"outline"}
                      size="sm"
                      className="flex-wrap justify-start"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <ToggleGroupItem value="s">Delivery</ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">
                        Take away
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">
                        En Local
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Elige modalidad de operación
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant={"outline"}
                      size="sm"
                      className="flex-wrap justify-start"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <ToggleGroupItem value="Burguers">
                        Hamburguesas
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">Pizzas</ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">Tacos</ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">
                        Helados
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">
                        Postres
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Burguers">
                        Facturas
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Elige las categorias representadas en tu local
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isAdmin ? (
              <>
                <div className="col-span-full h-2 border-t" />
                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="col-span-3 flex flex-row items-start space-x-3 space-y-0 sm:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Habilitado</FormLabel>
                        <FormDescription>
                          Indica si el local es visible publicamente
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="col-span-3 flex flex-row items-start space-x-3 space-y-0 sm:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Promocional</FormLabel>
                        <FormDescription>
                          Indica si el local debe ser promocionado
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="col-span-2 place-self-end">
              Guardar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
