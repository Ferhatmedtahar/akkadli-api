import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GoogleOAuthProvider clientId="308654562277-5331r9ncei2i2tj57h3ef9tniqn44cmd.apps.googleusercontent.com">
          <GoogleLogin
            buttonText="Login"
            onSuccess={(response) => {
              console.log(response);
              fetch("http://localhost:3000/auth/google-authentication", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: response.credential,
                }),
              })
                .then((response) => response.json())
                .then((data) => console.log(data));
              // .then((response) => console.log("response", response))
              // .then((data) => console.log("data", data));
            }}
          />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default App;
