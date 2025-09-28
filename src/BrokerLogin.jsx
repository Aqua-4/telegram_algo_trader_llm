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

    // console.log("Redirect URL:", redirect);

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
    <div class="m-2">
      <h2>Broker Login</h2>

      {githubLink && (
        <div class="m-2 d-grid">
          <p>
            <span>
            Click the button to Copy & then Paste this link in the Telegram chat with @aqua4_pi_bot to login.
            </span>
            <br></br>
            <span class="badge text-bg-info">
              <b>Note:</b> The link is also copied to your clipboard, so you can directly paste it in Telegram.
            </span>
            <span class="badge text-bg-secondary">
              If nothing happens, click the button again.
            </span>
          </p>
            <button
              onClick={copyAndRedirect}
              className="btn btn-primary btn-lg"
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
