import Image from "next/image";

export default async function AnimalsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/animals`, { cache: "no-store" });
  //   const res = await fetch(`/api/animals`, { cache: "no-store" });
  const animals = await res.json();

  return (
    <main className="p-8 grid gap-8">
      <h1 className="text-4xl font-bold">Animals</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="p-4 bg-slate-800 rounded-xl flex flex-col items-center">
            <Image
              src={animal.image}
              alt={animal.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">{animal.name}</h2>
            <p className="italic">{animal.species}</p>
            <p className="text-sm mt-2">{animal.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
