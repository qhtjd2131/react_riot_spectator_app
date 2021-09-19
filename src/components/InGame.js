import React from "react";

function InGame({ id, nickName, onGame }) {
  return (
    <h3>
      {nickName} : {id}, {onGame === "200" ? "게임 중" : "쉬는 중"}
    </h3>
  );
}

export default InGame;
