import { React, useState, useEffect } from "react";
import axios from "axios";

//https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%ED%95%B5%EC%82%AC%EC%A3%BD?api_key=RGAPI-c5622e97-caa4-40ab-8515-0bf6150af985

function App() {
  const summonerName = [
    "쿡%20덕",
    "핵사죽",
    "worldberry",
    "티모는과학입ll다",
    "배함비",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [summonerEcryptedId, setSummonerEcryptedId] = useState([]);
  let ecryptedId = [];

  //const [data, setData] = useState([]);
  // name.map((summonerName) => {
  //   const { data } =
  //     axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/쿡덕?api_key=RGAPI-c5622e97-caa4-40ab-8515-0bf6150af985
  //   `);
  //   console.log(data);
  // });

  const getEncryptedId = () => {
    summonerName.map(async (smName) => {
      const {
        data: { id },
      } = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${smName}?api_key=RGAPI-c5622e97-caa4-40ab-8515-0bf6150af985`
      );
      ecryptedId.push(id);
    });
    console.log(ecryptedId);
  };

  useEffect(() => {
    getEncryptedId();
    setIsLoading(false);
  });

  return <div> hello world </div>;
}

export default App;
