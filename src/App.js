import { React, useState, useEffect } from "react";
import axios from "axios";
import InGame from "./components/InGame";
import "./App.css";
import InputBox from "./components/InputBox";

function App() {
  const [user, setUser] = useState([
    {
      id: null,
      nickName: "쿡 덕",
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
    { id: null, nickName: "갤고리", onGame: null },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [completeConnect, setCompleteConnect] = useState(false);
  const [apiKey] = useState("RGAPI-62e286d8-7277-41bc-885f-0122645af28e");

  useEffect(() => {
    getEncryptedId().then((rsts) => {
      setUser(rsts);
      getUserData(rsts).then((onGameData) => {
        setUser(onGameData);
        //console.log(onGameData);
      });
      setCompleteConnect(true);
      setIsLoading(false);
    });
  }, []);

  const getEncryptedId = async () => {
    return Promise.all(
      user.map(async (user1) => {
        const id = //useState 불변성 유지 해야함
        (
          await axios.get(
            `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user1.nickName}?api_key=${apiKey}`
          )
        ).data.id;
        return { id: id, nickName: user1.nickName, onGame: null };
      })
    );
  };

  const getUserData = async (rsts) => {
    //encrypted id 를 이용하여 다시 api 호출
    return Promise.all(
      rsts.map(async (user) => {
        const response = await axios
          .get(
            `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${user.id}?api_key=${apiKey}`
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

  const EmptyBox = () => {
    return <div className="emptyBox"> empty </div>;
  };
  const createEmptyBox = () => {
    const result = [];
    for (let i = 0; i < 15 - user.length; i++) {
      result.push(<EmptyBox />);
    }
    return result;
  };

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          loading ...
          <div>{completeConnect ? "연결성공" : "연결실패"}</div>
        </div>
      ) : (
        <div>
          <div className="inputContainer">
            <InputBox />
          </div>
          <div className="main">
            {user.map((user) => (
              <InGame
                key={user.nickName}
                id={user.id}
                nickName={user.nickName}
                onGame={user.onGame}
              />
            ))}

            {createEmptyBox()}
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
