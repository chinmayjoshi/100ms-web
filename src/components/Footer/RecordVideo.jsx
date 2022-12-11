import React, { Fragment, useState } from "react";
import { Tooltip } from "@100mslive/react-ui";
import IconButton from "../../IconButton";
import { FaRecordVinyl } from "react-icons/fa";
import MediaRecorder from "react-media-recorder";

// You can use the query-selector to specifically target the element you want to capture
export const RecordVideo = () => {
  console.log("Record-video");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const startRecording = () => {
    //Start recording
    setIsRecording(true);
  };
  const stopRecording = () => {
    setIsRecording(false);
    let recordedData = null;
    //Stop Recording and save the video
    setRecordedVideo(recordedData);
    downloadVideo();
  };
  const downloadVideo = () => {
    const url = URL.createObjectURL(recordedVideo);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded-video.mp4";
    document.body.appendChild(a);
    a.click();

    //clean up and remove the element
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Fragment>
      <Tooltip
        title={isRecording ? "Stop Recording" : "Start Recording"}
        key="recordVideo"
      >
        <IconButton
          data-testid="record_video"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isRecording && !recordedVideo}
        >
          <FaRecordVinyl />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};
