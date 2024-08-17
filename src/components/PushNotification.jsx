import { Button } from "@mui/material";
// import React from "react";

const PushNotification = () => {
  return (
    <div>
      <Button
        onClick={() => {
          Notification.requestPermission().then((a) => {
            alert(a);
            if (a === "granted") {
              new Notification("Hello, world!");
            }
          });
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default PushNotification;
