import { React, useState, useEffect } from "react";
import axios from "axios";
import InGame from "./components/InGame";
import "./App.css";
import InputBox from "./components/InputBox";

function App() {
  const [user, setUser] = useState([
    // {
    //   id: null,
    //   nickName: "쿡 덕",
    //   onGame: null,
    // },
    // {
    //   id: null,
    //   nickName: "핵사죽",
    //   onGame: null,
    // },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [completeConnect, setCompleteConnect] = useState(false);
  const [apiKey] = useState("RGAPI-d0b82959-4fe4-4998-b7c7-d3800e25a775");

  useEffect(() => {
    // getEncryptedId().then((rsts) => {
    //   getUserData(rsts).then((onGameData) => {
    //     setUser(onGameData);
    //   });
    //   setCompleteConnect(true);
    //   setIsLoading(false);
    // });
    setCompleteConnect(true);
    setIsLoading(false);
  }, []);

  //처음 데이터 받아오는 부분
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
            console.log("error getStatus");
            return "404";
          });

        return { id: user.id, nickName: user.nickName, onGame: response };
      })
    );
  };

  //빈공간 관련
  const EmptyBox = () => {
    return <div className="emptyBox"> empty </div>;
  };
  const createEmptyBox = () => {
    const result = [];
    for (let i = 0; i < 15 - user.length; i++) {
      result.push(<EmptyBox key={i} />);
    }
    return result;
  };

  //user 추가 관련
  const getEncryptedId_newUser = async (nickName) => {
    try {
      const id = await (
        await axios.get(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
        )
      ).data.id;
      return id;
    } catch (e) {
      alert("아이디 오류", e);
    }
  };

  const getUserData_newUser = async (id) => {
    const status = await axios
      .get(
        `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${apiKey}`
      )
      .then(() => {
        return "200";
      })
      .catch((error) => {
        console.log(error);
        return "404";
      });

    return status;
  };

  const addUser = (user_nickname) => {
    getEncryptedId_newUser(user_nickname)
      .then(async (id) => {
        const ongame = await getUserData_newUser(id);

        return { id, ongame };
      })
      .then(({ id, ongame }) => {
        if (id) {
          const newUser = {
            id: id,
            nickName: user_nickname,
            onGame: ongame,
          };

          setUser((prev_user) => [...prev_user, newUser]);
        }
      });
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
            <InputBox addUser={addUser} />
          </div>
          <div className="main">
            {console.log(user)}
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
