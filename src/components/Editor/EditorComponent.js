import * as React from 'react';
import {Button} from "@mui/material";
import Editor from "@monaco-editor/react";


const EditorComponent = (props) => {
  const [contentCode, setContentCode] = React.useState("");
  const [content, setContent] = React.useState();
    const isOwner = props.userId === "1" // replace with cookie value
    const addPublication = props.addPublication? "none" : "visible"
    const readOnly = (addPublication==="none" || isOwner)
    const executionPublication = props.addPublication? "visible" : "none"
    const [typeCode, setTypeCode] = React.useState(["c","c#","java"]);
    const [typeCodeSelected, setTypeCodeSelected] = React.useState(["c","c#","java"]);

  const AddThisPublication=()=>{
      console.log(props.userId)
      console.log(props.contentMessageAdd)
      console.log(contentCode)
      console.log(typeCode[contentCode])
    };
  const ExecutionPublication=()=>{
      console.log(props.userId)
      console.log(props.contentMessage)
      console.log(contentCode)
      console.log(typeCodeSelected)
    }
    return(
      <>
            <Editor
                height={props.height} //400
                defaultLanguage={props.typeCode}
                defaultValue={props.defaultValue}
                theme={props.theme}
                onChange={(value) => setContentCode(value)}
                options={{readOnly: !readOnly}}
            />
            <Button variant="contained"  onClick={ExecutionPublication} >
              Execution
            </Button>


            <Button style={{display:executionPublication}} variant="contained"  onClick={AddThisPublication}>

              Add publication
            </Button>
            <select name="typeCode">
              {/*} {typeCode.map((currElement, index) => <option onChange={e => setContentCode(index)} key={currElement} value={typeCode[index]}>{typeCode[index]}</option>)}
            {*/}
              {typeCode.map((currElement, index) => <option onChange={e => console.log(e)} key={currElement} value={typeCode[index]}>{typeCode[index]}</option>)}

            </select>

      </>
    );
}

export default EditorComponent;
