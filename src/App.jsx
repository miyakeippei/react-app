import React, { useEffect, useState } from "react";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { listContracts } from "./graphql/queries";

Amplify.configure(awsExports);

function App({ signOut, user }) {
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
    <div style={{ padding: "2rem" }}>
      <h1>ようこそ {user.username} さん </h1>
      <p>あなたの契約一覧：</p>
      <ul>
        {contracts.map(c => (
          <li key={c.id}>
            {c.contractNumber} / {c.insuranceType} / {c.premium}円 / 次回: {c.nextPaymentDate}
          </li>
        ))}
      </ul>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
}

export default withAuthenticator(App);