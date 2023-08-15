import React, { useEffect, useState } from "react";
import { Character, fetchCharacters } from "../helpers/characterListHelper";
import Link from "next/link";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function fetchAndSetCharacters() {
      const charactersData = await fetchCharacters();
      setCharacters(charactersData);
    }
    fetchAndSetCharacters();
  }, []);

  if (characters.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Characters ...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center pb-4">
        Harry Potter Characters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {characters.length > 0 &&
          characters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                <h2 className="text-lg text-black-900 font-semibold">
                  {character.name}
                </h2>
                <p className="text-black-900 mb-2">
                  {character.dateOfBirth
                    ? `D.O.B: ${character.dateOfBirth}`
                    : `D.O.B: Not Given`}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CharacterList;
