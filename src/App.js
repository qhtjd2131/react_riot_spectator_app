import { React, useState, useEffect } from "react";
import axios from "axios";
import InGame from "./components/InGame";
import "./App.css";

function App() {
  const [user, setUser] = useState([
    {
      id: undefined,
      nickName: "쿡 덕",
      onGame: false,
    },
    {
      id: undefined,
      nickName: "핵사죽",
      onGame: false,
    },
    {
      id: undefined,
      nickName: "worldberry",
      onGame: false,
    },
    {
      id: undefined,
      nickName: "티모는과학입ll다",
      onGame: false,
    },
    {
      id: undefined,
      nickName: "배함비",
      onGame: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEncryptedId().then(() => {
      console.log(user);
      getUserData();
      setIsLoading(false);
    });
  }, []);

  const getEncryptedId = async () => {
    return Promise.all(
      user.map(async (user) => {
        user.id = (
          await axios.get(
            `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user.nickName}?api_key=RGAPI-cf5e5172-5e01-445e-b754-b03e22a8901e`
          )
        ).data.id;
      })
    );
  };

  const getUserData = async (userIds) => {
    //encrypted id 를 이용하여 다시 api 호출
  };

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">loading ...</div>
      ) : (
        <div className="main">
          {user.map((user) => (
            <InGame
              key={user.id}
              id={user.id}
              nickName={user.nickName}
              onGame={user.onGame}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default App;
