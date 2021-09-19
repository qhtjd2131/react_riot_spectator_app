import { React, useState, useEffect } from "react";
import axios from "axios";
import InGame from "./components/InGame";
import "./App.css";

function App() {
  const [user, setUser] = useState([
    {
      id: null,
      nickName: "소 브",
      onGame: null,
    },
    {
      id: null,
      nickName: "핵사죽",
      onGame: null,
    },
    {
      id: null,
      nickName: "worldberry",
      onGame: null,
    },
    {
      id: null,
      nickName: "티모는과학입ll다",
      onGame: null,
    },
    {
      id: null,
      nickName: "배함비",
      onGame: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEncryptedId().then((rsts) => {
      setUser(rsts);
      getUserData(rsts).then((onGameData) => {
        setUser(onGameData);
        console.log(onGameData);
      });
      setIsLoading(false);
    });
  }, []);

  const getEncryptedId = async () => {
    return Promise.all(
      user.map(async (user1) => {
        const id = ( //useState 불변성 유지 해야함
          await axios.get(
            `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user1.nickName}?api_key=RGAPI-cf5e5172-5e01-445e-b754-b03e22a8901e`
          )
        ).data.id;
        return { id: id, nickName: user1.nickName, onGame: "x" };
      })
    );
  };

  const getUserData = async (rsts) => {
    //encrypted id 를 이용하여 다시 api 호출
    return Promise.all(
      rsts.map(async (user) => {
        const response = await axios
          .get(
            `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${user.id}?api_key=RGAPI-cf5e5172-5e01-445e-b754-b03e22a8901e`
          )
          .then(() => {
            return "200";
          })
          .catch(() => {
            return "404";
          });
        //console.log(user.id);

        return { id: user.id, nickName: user.nickName, onGame: response };
      })
    );
  };

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">loading ...</div>
      ) : (
        <div className="main">
          {user.map((user) => (
            <InGame
              key={user.nickName}
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
