export const fetchNonce = async (address) => {
  const BE_URL = process.env.REACT_APP_BE_URL;
  try {
    const res = await fetch(`${BE_URL}/auth/nonce/${address}`);
    const response = await res.json();
    const { nonce } = response.data;
    return nonce;
  } catch (error) {
    console.error("Error fetching nonce:", error);
    throw error;
  }
};
