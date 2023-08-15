import React, { useEffect, useState } from "react";
import { Character, fetchCharacters } from "../helpers/characterListHelper";
import Link from "next/link";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mySearch, setMySearch] = useState<boolean>(false);
  const [viewData, setMyData] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<Character[]>([]);

  useEffect(() => {
    async function fetchAndSetCharacters() {
      const charactersData = await fetchCharacters();
      setCharacters(charactersData);
    }
    fetchAndSetCharacters();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setMyData(true);
      setMySearch(false);
    } else {
      setMyData(false);
      const filteredCharacters = characters.filter(
        (character) =>
          character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          character.house.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredCharacters);
      if (filteredCharacters.length <= 0) {
        setMySearch(true);
      } else if (filteredCharacters.length > 0) {
        setMySearch(false);
      }
    }
  }, [searchQuery, characters]);

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
      <div className="flex justify-center items-center mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or house"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>
      
      {mySearch && (
        <h1 className="text-0.5xl text-red-900 font-bold mb-2 text-center pb-4">
          No match for your search ....
        </h1>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {viewData &&
          characters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                <h2 className="text-lg text-black font-semibold">
                  {character.name}
                </h2>
                <p className="text-black mb-2">
                  {character.dateOfBirth
                    ? `D.O.B: ${character.dateOfBirth}`
                    : `D.O.B: Not Given`}
                </p>
              </div>
            </Link>
          ))}

        {searchResults.length > 0 &&
          searchResults.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                <h2 className="text-lg text-black font-semibold">
                  {character.name}
                </h2>
                <p className="text-black mb-2">
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
