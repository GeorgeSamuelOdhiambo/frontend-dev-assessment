export type CharacterDetails = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
};

export const fetchCharacters = async (
  id: string
): Promise<CharacterDetails[]> => {
  try {
    const response = await fetch(
      `https://hp-api.onrender.com/api/character/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    return [];
  }
};
