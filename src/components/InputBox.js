import { React, useState } from "react";
import "./InputBox.css";

function InputBox({ addUser }) {
  const [nickName, setNickName] = useState("");

  const handleInputChange = (e) => {
    setNickName(e.target.value);
  };

  const handleAddButton = () => {
    addUser(nickName);
    console.log("handle Add Button");
  };

  return (
    <div>
      <input
        type="text"
        name="nickName"
        value={nickName}
        onChange={handleInputChange}
        spellCheck={false}
      ></input>
      <button onClick={handleAddButton}> add </button>
    </div>
  );
}

export default InputBox;
