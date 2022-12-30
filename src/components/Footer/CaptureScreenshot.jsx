import html2canvas from "html2canvas";
import React, { Fragment } from "react";
import { Tooltip } from "@100mslive/react-ui";
import IconButton from "../../IconButton";
import { FaCamera } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

//Constants
const url = "http://localhost:8080/api/v1/capturedImages/create";

function handleAPISuccess(response) {
  toast.success("Image captured successfully");
}

// You can use the query-selector to specifically target
export const CaptureScreenshot = () => {
  console.log("CaptureScreenshot");
  const getImage = async () => {
    html2canvas(document.querySelector('[data-testid="conferencing"]')).then(
      function (canvas) {
        //TODO : Flip the image if required
        const image = canvas.toDataURL("image/png", 1.0);
        fetch(url, {
          method: "POST",
          body: JSON.stringify({ image: image, sessionId: "123" }),
          headers: { "Content-Type": "application/json" },
        })
          .then(response => response.json())
          .then(data => {
            handleAPISuccess(data);
          });
      }
    );
  };
  return (
    <Fragment>
      <ToastContainer />
      <Tooltip title="Capture screenshot" key="captureScreenshot">
        <IconButton onClick={getImage} data-testid="capture_screenshot">
          <FaCamera />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};
