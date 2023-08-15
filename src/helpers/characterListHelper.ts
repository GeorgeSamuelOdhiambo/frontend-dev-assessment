export type Character = {
  id: string;
  name: string;
  dateOfBirth: string;
  house: string;
};

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching characters from the API:", error);
    return [];
  }
};
