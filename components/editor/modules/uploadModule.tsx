import React, { useState } from "react";

interface UploadModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

export const UploadModuleComponent: React.FC<UploadModuleProps> = (
  props: UploadModuleProps
) => {
  const { sendPicture, bgColor } = props;
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendPicture = () => {
    if (typeof imgUrl === "string") {
      sendPicture(imgUrl);
    } else {
      console.error("Invalid image URL");
    }
  };

  return (
    <div
      className="min-w- border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-6"
      style={{ backgroundColor: bgColor }}
    >
      Upload Module
      <br />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imgUrl && typeof imgUrl === "string" && (
        <div>
          <img
            src={imgUrl as string}
            alt="Selected"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            onClick={handleSendPicture}
          />
        </div>
      )}
    </div>
  );
};
