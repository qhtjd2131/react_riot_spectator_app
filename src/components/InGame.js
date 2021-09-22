import React from "react";
import "./InGame.css";

function InGame({ id, nickName, onGame }) {
  return (
    <div className="user">
      <div className="user_nickname">
        {nickName}
        <div className="user_ongame"> {onGame === "200" ? "On" : "..."}</div>
      </div>
    </div>
  );
}

export default InGame;
