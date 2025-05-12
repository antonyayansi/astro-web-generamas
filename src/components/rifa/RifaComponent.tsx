import { useEffect } from "react";
import { useRifaStore } from "@/hooks/useRifas";

export const RifaComponent = () => {
  const { rifas, setRifas } = useRifaStore();

  useEffect(() => {
    // Simulación fetch desde API
    fetch("/api/rifas")
      .then((res) => res.json())
      .then(setRifas);
  }, [setRifas]);

  return (
    <div className="flex flex-col gap-4">
      {rifas.length === 0 ? (
        <p className="text-gray-500">No hay rifas aún</p>
      ) : (
        rifas.map((rifa) => (
          <div
            key={rifa.id}
            className="border rounded-xl p-4 shadow bg-white dark:bg-zinc-950 dark:border-zinc-700"
          >
            <h2 className="text-xl font-semibold">{rifa.nombre}</h2>
            <p className="text-sm text-gray-500">
              Precio: S/. {rifa.precio}
            </p>
          </div>
        ))
      )}
    </div>
  );
}