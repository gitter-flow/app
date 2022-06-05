import * as React from 'react';
import {Button} from "@mui/material";
import Editor from "@monaco-editor/react";


const EditorComponent = (props) => {
    const [content, setContent] = React.useState("");
    const isOwner = props.userId === "1" // replace with cookie value
    const addPublication = props.addPublication? "none" : "visible"
    const readOnly = (addPublication==="none" || isOwner)
    const executionPublication = props.addPublication? "visible" : "none"
    const [typeCode, setTypeCode] = React.useState(["c","c#","java"]);

  const AddThisPublication=()=>{
      console.log(props.userId)
      console.log(content)
    }
  const ExecutionPublication=()=>{
      console.log(props.userId)
      console.log(content)
    }
    return(
      <>
            <Editor
                height={props.height} //400
                defaultLanguage={props.typeCode}
                defaultValue={props.defaultValue}
                theme={props.theme}
                onChange={(value) => setContent(value)}
                options={{readOnly: !readOnly}}
            />
            <Button variant="contained" style={{display:addPublication}} onClick={ExecutionPublication} >
              Execution
            </Button>

        <div style={{display:executionPublication}}>
            <Button variant="contained"  onClick={AddThisPublication}>

              Add publication
            </Button>
            <select name="typeCode">
              {typeCode.map((currElement, index) => <option key={currElement} value={typeCode[index]}>{typeCode[index]}</option>)}
            </select>
        </div>
      </>
    );
}

export default EditorComponent;
