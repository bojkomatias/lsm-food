export function ResultQuantity({ quantity }: { quantity: number }) {
  return (
    <div className="px-1 text-xs font-thin uppercase leading-loose tracking-wider">
      {quantity} {quantity === 1 ? "Resultado" : "Resultados"}
    </div>
  );
}
