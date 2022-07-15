import * as React from "react";
const JoinTeam = (props) => {

   function joinThisTeam() {
    //  fetch(`${process.env.REACT_APP_API_URL}/team/join`, {
    //   "headers": {
    //     "accept": "application/json",
    //     "authorization": `Bearer ${cookies["keycloaktoken"]}`,
    //     "content-type": "application/json",
    //   },
    //   "body": `{\"userId\":\"${cookies["userId"]}\",\"teamId\":\"` + "8286c7c4-44c4-4845add3-a47a647526b2" + "\"}",
    //   "method": "POST"
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log(props.userId);
    //     console.log(data);
    //    // console.log(props.teamId);
    //   })
    //   //.catch(e => {console.log(e)})

  }

  return (
    <>
      <div>
        <label> Voulez vous vraiment rejoindre cette Equipe ? </label>
      </div>
      <div>
        <button onClick={joinThisTeam}> Oui</button>
        </div>
    </>
  );
}

export default JoinTeam;
