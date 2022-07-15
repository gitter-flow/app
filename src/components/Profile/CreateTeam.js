import * as React from "react";

const CreateTeam = (props) => {
  const [content, setContent] = React.useState("");


  function creation() {
    console.log(props.userId);
    console.log(content);
  }

  return (
    <>
      <div>
        <label> Nom du groupe : </label>
      </div>
      <div>
        <textarea label="Entrer le nom de l'equipe" id=""  onChange={(e) => setContent(e.target.value)} style={{"min-width":"-webkit-fill-available","max-width":"-webkit-fill-available", "min-height":"4em", "max-height":"7em"}}/>

      </div>
      <div>
        <button onClick={creation}> creation</button>
      </div>
    </>
  );
}

export default CreateTeam;
