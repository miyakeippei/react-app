import React, { useEffect, useState } from "react";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { listContracts } from "./graphql/queries";
Amplify.configure(awsExports);

function App({signOut,user}) {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    async function fetchContracts() {
      try {
        //  ログインユーザーの契約番号を取得
        const currentUser = await Auth.currentAuthenticatedUser();
        const contractNumber = currentUser.attributes["custom:contractNumber"];

        //  契約番号で契約データを検索
        const result = await API.graphql(
          graphqlOperation(listContracts, {
            filter: { contractNumber: { eq: contractNumber } }
          })
        );

        setContracts(result.data.listContracts.items);
      } catch (error) {
        console.error("契約データ取得エラー:", error);
      }
    }

    fetchContracts();
  }, []);


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
