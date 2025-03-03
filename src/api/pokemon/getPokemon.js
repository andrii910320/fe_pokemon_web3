export const fetchPokemon = async (page, limit) => {
  const BE_URL = process.env.REACT_APP_BE_URL;
  try {
    const token = localStorage.getItem("token");
    const pokemonRes = await fetch(`${BE_URL}/pokemons/${page}/${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await pokemonRes.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error verifying login:", error);
    throw error;
  }
};
