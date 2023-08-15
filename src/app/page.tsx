"use client"
import CharacterList from "@/components/CharacterList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 pb-10">
      <CharacterList />
    </main>
  );
}
