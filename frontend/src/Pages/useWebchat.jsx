import { useEffect } from "react";

const useWebchat = () => {
    //initialize Twilio webchat
    useEffect(() => {
        console.warn("useWebchat useEffect")
        if (!document.getElementById("root2") && window.Twilio) {
            console.warn("useWebchat useEffect IF")

            const Twilio = window.Twilio;
            const root2 = document.createElement("div");
            root2.setAttribute("id", "root2");
            document.body.appendChild(root2);

            const backendUrl = window.location.origin;
            const domain = window.location.host;
            Twilio.initWebchat({
                serverUrl: backendUrl.includes("localhost:")
                    ? "http://localhost:3000"
                    : `https://${domain}`,
                theme: {
                    isLight: true,
                },
            });
        } else {
            console.warn("useWebchat useEffect else")
        }
    });
};

export default useWebchat;