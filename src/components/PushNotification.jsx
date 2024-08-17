import { Button } from "@mui/material";
// import React from "react";

const PushNotification = () => {
  if ("Notification" in window) {
    alert(true);
  } else {
    alert(false);
  }
  let permission = Notification.permission;
  console.log("permission", permission);
  if (permission === "granted") {
    showNotification();
  } else if (permission === "default") {
    requestAndShowPermission();
  } else if (permission === "denied") {
    alert("Permissions denied");
  } else {
    alert("Use normal alert");
  }

  function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
  function showNotification() {
    setTimeout(() => {
      console.log("Show notification");
      if (document.visibilityState === "visible") {
        console.log("visible");
        //   return;
      } else {
        console.log("not visible");
      }
      let title = "I love Educative.io";
      let icon = "https://homepages.cae.wisc.edu/~ece533/images/zelda.png"; //this is a large image may take more time to show notifiction, replace with small size icon
      let body = "Message to be displayed";

      let notification = new Notification(title, { body, icon });

      notification.onclick = () => {
        notification.close();
        window.parent.focus();
      };
    }, 5000);
  }
  return (
    <div>
      <Button
        onClick={() => {
          PushNotification();
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default PushNotification;
