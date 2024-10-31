import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

const Login = () => {
  const [browser, setBrowser] = useState('');
  const [os, setOS] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [isChrome, setIsChrome] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Get browser and system info
    const parser = new UAParser();
    const result = parser.getResult();
    setBrowser(result.browser.name);
    setOS(result.os.name);
    setDeviceType(result.device.type || "desktop");

    if (result.browser.name === "Chrome") {
      setIsChrome(true);
    }
    if (result.device.type === "mobile") {
      setIsMobile(true);
    }

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip));
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <p>Browser: {browser}</p>
      <p>Operating System: {os}</p>
      <p>Device Type: {deviceType}</p>
      <p>IP Address: {ipAddress}</p>
    </div>
  );
};

export default Login;
