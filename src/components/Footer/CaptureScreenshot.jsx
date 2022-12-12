import html2canvas from "html2canvas";
import React, { Fragment } from "react";
import { Tooltip } from "@100mslive/react-ui";
import IconButton from "../../IconButton";
import { FaCamera } from "react-icons/fa";

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  fakeLink.href = blob;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};
// You can use the query-selector to specifically target
export const CaptureScreenshot = () => {
  console.log("CaptureScreenshot");
  const getImage = async () => {
    html2canvas(document.querySelector('[data-testid="conferencing"]')).then(
      function (canvas) {
        //TODO : Flip the image if required
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, "screenshot.png");
      }
    );
  };
  return (
    <Fragment>
      <Tooltip title="Capture screenshot" key="captureScreenshot">
        <IconButton onClick={getImage} data-testid="capture_screenshot">
          <FaCamera />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};
