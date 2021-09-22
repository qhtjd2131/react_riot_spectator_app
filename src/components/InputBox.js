import { react, useState } from "react";
import "./InputBox.css";

function InputBox() {
  const appChange = (e) => {
    setNickName(e.target.value);
  };
  const [nickName, setNickName] = useState("");
  return (
    <input
      type="text"
      name="nickName"
      value={nickName}
      onChange={appChange}
      spellCheck={false}
    ></input>
  );
}

export default InputBox;
