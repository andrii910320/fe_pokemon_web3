export const verify = async (address, signature) => {
  const BE_URL = process.env.REACT_APP_BE_URL;
  try {
    const verifyResponse = await fetch(`${BE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, signature }),
    });
    const { data } = await verifyResponse.json();
    const { token } = data;
    return token;
  } catch (error) {
    throw error;
  }
};
