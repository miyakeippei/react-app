import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

// import { API, graphqlOperation } from "aws-amplify";
// import { listContracts } from "./graphql/queries";

Amplify.configure(awsExports);

function App({signOut,user}) {


  return (
    <>

      <h1>Vite + React</h1>
      {user ?(
        <>
        <h3>{user.username}</h3>
        <button onClick={signOut}>サインアウト</button>



        </>
      ):(
        <h3>権限なし</h3>
      )}

    </>
  )
}

export default withAuthenticator(App);
