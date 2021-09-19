import React from "react";
import "./InGame.css";

function InGame({ id, nickName, onGame }) {
  return (
    <div className="user">
      {nickName} : {onGame === "200" ? "게임 중" : "쉬는 중"}
    </div>
  );
}

export default InGame;
