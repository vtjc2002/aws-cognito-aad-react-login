import React, { useEffect, useState } from "react";
import '@aws-amplify/ui-react/styles.css';
import './App.css';

import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import cognitoConfig from './cognitoConfig';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolClientId,
      loginWith: {
        oauth: {
          domain: cognitoConfig.cognitoDomain,
          scopes: cognitoConfig.scopes,
          redirectSignIn: cognitoConfig.redirectSignIn,
          redirectSignOut: cognitoConfig.redirectSignOut,
          responseType: cognitoConfig.responseType
        }
      }
    }
  }
});

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [customState, setCustomState] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          getUserAccessToken();
          break;
        case "signInWithRedirect_failure":
          setError("An error has occurred during the OAuth flow.");
          break;
        case "customOAuthState":
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });

    getUser();
    getUserAccessToken();

    return unsubscribe;
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  const getUserAccessToken = async () => {
    try {
      const localkey = `CognitoIdentityServiceProvider.${cognitoConfig.userPoolWebClientId}.${user?.username}.accessToken`;
      const currentUserAccessToken = localStorage.getItem(localkey);
      setUserToken(currentUserAccessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <button className="btn btn-info" onClick={() => signInWithRedirect({ customState: "azureentraidp" })}>Open AWS Cognito Hosted UI</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <div>{user?.username}</div>
      <div>{userToken}</div>
      {/* <div>{customState}</div> */}
    </div>
  );
}

export default App;