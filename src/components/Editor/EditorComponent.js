import * as React from 'react';
import {Button} from "@mui/material";
import Editor from "@monaco-editor/react";


const EditorComponent = (props) => {
    const [content, setContent] = React.useState("");
    const isOwner = props.userId === "1" // replace with cookie value

    return(  <>
    <Editor
                height={props.height} //400
                defaultLanguage={props.typeCode}
                readOnly={!isOwner}
                defaultValue={props.defaultValue}
                theme={props.theme}
                onChange={(value) => setContent(value)}

            />
            <Button variant="contained" >
                Execution
            </Button>
            </>
    );
}

export default EditorComponent;
