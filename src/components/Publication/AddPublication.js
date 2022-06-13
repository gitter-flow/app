import * as React from "react";
import EditorComponent from "../Editor/EditorComponent";


const AddPublication = (props) => {
  const [content, setContent] = React.useState("");
  return (
    <>
      <div>
        <label> message : </label>
      </div>
      <div>
        <textarea label="Enter your message" id="fullWidth"  onChange={(e) => setContent(e.target.value)} />
      </div>
      <EditorComponent
        height={props.height}
        userId={props.userId}
        defaultValue=""
        theme='vs-dark'
        typeCode={props.typeCode}
        addPublication = {props.addPublication}
        contentMessage={props.contentMessage}
        contentMessageAdd={content}
      />
    </>
  );
}

export default AddPublication;
