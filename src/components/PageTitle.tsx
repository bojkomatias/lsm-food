export function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="px-2 font-serif text-3xl font-extrabold lg:text-4xl">
      {title}
    </h1>
  );
}
