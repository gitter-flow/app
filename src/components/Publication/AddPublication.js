import * as React from "react";
import EditorComponent from "../Editor/EditorComponent";


const AddPublication = (props) => {
  const [content, setContent] = React.useState("");



  return (
    <>
      <div>
        <label> Message : </label>
      </div>
      <div>
        <textarea label="Enter your message" id=""  onChange={(e) => setContent(e.target.value)} style={{"min-width":"-webkit-fill-available","max-width":"-webkit-fill-available", "min-height":"4em", "max-height":"7em"}}/>
      </div>
      <EditorComponent
        height={props.height}
        defaultValue=""
        theme='vs-dark'
        selectedTypeCode={props.typeCode}
        addPublication = {props.addPublication}
        content={props.contentMessage}
        contentMessageAdd={content}
        parentPublicationId={props.parentPublicationId}
        addPublication={props.addPublication}
      />
    </>
  );
}

export default AddPublication;
