import * as React from "react";
import EditorComponent from "../Editor/EditorComponent";


const AddPublication = (props) => {
  return (
    <>
      <EditorComponent
        height={props.height}
        userId={props.userId}
        defaultValue=""
        theme='vs-dark'
        typeCode={props.typeCode}
        addPublication = {props.addPublication}
      />
    </>
  );
}

export default AddPublication;
