import { useEffect, useState } from "react";



function BrokerLogin() {
  const [githubLink, setGithubLink] = useState("");
  const [copyLink, setCopyLink] = useState("");
  const [params, setParams] = useState({});

  const copyAndRedirect = () => {
    if (copyLink) {
      navigator.clipboard.writeText(copyLink)
      window.location.href = githubLink
    }
  };

  useEffect(() => {

    console.log("No Telegram context, running in browser/github");

    const hash = window.location.hash; // e.g., "#/login?s=ok&code=200"
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const urlParams = new URLSearchParams(queryString);


    let brokerParams = {};
    urlParams.forEach((value, key) => {
      brokerParams[key] = value;
    });

    console.log("URL params:", brokerParams);

    const paramString = new URLSearchParams(brokerParams).toString();
    const localUrl = `http://127.0.0.1/?${paramString}`;
    const encodedParamString = encodeURIComponent(localUrl);
    const redirect = `https://t.me/aqua4_pi_bot?text=${encodedParamString}`;

    // const paramString = new URLSearchParams(brokerParams).toString();
    // const encoded = encodeURIComponent(paramString);
    // const redirect = `https://t.me/aqua4_algotrader_bot/AlgoTraderApp?startapp=${encoded}`;

    console.log("Redirect URL:", redirect);

    setGithubLink(redirect);
    setCopyLink(localUrl);
    
    // optional: delay redirect by 1s so user sees link
    navigator.clipboard.writeText(localUrl).then(() => {
      setTimeout(() => {
        window.location.href = redirect;
      }, 5000);
    });

    setParams(brokerParams);
    
        
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Broker Login</h2>

      {githubLink && (
        <div style={{ marginTop: 20 }}>
          <p style={{ marginBottom: 10 }}>
            Paste this link in the Telegram chat with
            @aqua4_pi_bot to login.
            <br />
            <b>Note:</b> The link is also copied to your clipboard, so you can directly paste it in Telegram.
            <br />
            If nothing happens, click the button again.
          </p>
            <button
              onClick={copyAndRedirect}
              style={{
                backgroundColor: "#24292f", // GitHub dark
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1em",
              }}
            >
              Click the button to copy the link
            </button>
        </div>
      )}

      {/* <h3>Debug Info</h3>
      <pre>{JSON.stringify(params, null, 2)}</pre> */}
    </div>
  );
}

export default BrokerLogin;
