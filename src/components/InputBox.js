import { react, useState } from "react";

function InputBox() {
  const appChange = (e) => {
    setNickName(e.target.value);
  };
  const [nickName, setNickName] = useState("");
  return (
    <div>
      <input
        type="text"
        name="nickName"
        value={nickName}
        onChange={appChange}
      ></input>
    </div>
  );
}

export default InputBox;
