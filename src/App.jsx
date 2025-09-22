import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Amplify} from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
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
      <div className="test">towa</div>
      <div className="test">ippei</div>
      <div className="test">とわとわ</div>
    </>
  )
}

export default withAuthenticator(App);
