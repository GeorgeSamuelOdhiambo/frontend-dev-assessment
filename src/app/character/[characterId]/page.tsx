"use client";
import React, { useEffect, useState } from "react";
import {
  CharacterDetails,
  fetchCharacters,
} from "../../../helpers/getCharacterByIdHelper";

export default function Home({ params }: { params: { characterId: string } }) {
  let id = params.characterId;
  const [characters, setCharacter] = useState<CharacterDetails[]>([]);

  useEffect(() => {
    async function fetchCharacterDetails() {
      if (id) {
        try {
          const response = await fetchCharacters(id);
          setCharacter(response);
        } catch (error) {
          console.error("Error fetching character details:", error);
        }
      }
    }
    fetchCharacterDetails();
  }, [id]);

  if (characters.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Character Details
        </h1>
        {characters.map((character) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 flex"
            key={character.id}
          >
            <div className="w-1/4 pr-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-3/4">
              <p className="text-lg font-semibold">Name: {character.name}</p>
              <p>Gender: {character.gender}</p>
              <p>House: {character.house}</p>
              <p>
                Wand: {character.wand.wood} with {character.wand.core} core,{" "}
                {character.wand.length} inches
              </p>
              {character.alive ? <p>Status: Alive</p> : <p>Status: Deceased</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
