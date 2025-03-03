import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import s from "./style.module.css";
import { fetchNonce } from "../../api/auth/getNonce";
import { verify } from "../../api/auth/login";

const StartPage = ({ setToken }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    setLoading(true);
    const web3 = new Web3(window.ethereum);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      const nonce = await fetchNonce(address);
      const signature = await web3.eth.personal.sign(nonce, address, "");

      verify(address, signature).then((token) => {
        if (token) {
          localStorage.setItem("token", token);
          setToken(token);
          navigate("/game");
        } else {
          alert("Authentication failed");
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("gello");
      if (error.code === 4001) {
        alert("Account access was denied. Please allow access to continue.");
      } else {
        alert("Authentication error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={s.startPage}>
      <h2 className={s.title}>POKEMON BATTLE</h2>
      <p className={s.description}>Chose pokemon and fight!</p>
      <button className={s.startBtn} onClick={handleLogin} disabled={loading}>
        {loading ? "Connecting..." : "GO!"}
      </button>
    </div>
  );
};

export default StartPage;
