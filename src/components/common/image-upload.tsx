import React, {useState} from "react";
import {Input} from "@/components/shadcn-ui/input.tsx";
import {cn} from "@/lib/utils.ts";

export interface ImageUploadProps {
  onUpload(image: File): void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  className,
}) => {
  const [preview, setPreview] = useState("");

  const _onUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = ev.target.files;
    if (fileList && fileList.length > 0) {
      // we can assert as non-null safely
      const file = fileList.item(0)!;
      onUpload(file);
      setPreview(URL.createObjectURL(file));
    }
    ev.target.value = "";
  };

  return (
    <>
      <Input
        onChange={_onUpload}
        id="ImageUploadInput"
        className="hidden"
        type="file"
      />
      <label
        htmlFor="ImageUploadInput"
        className={cn("flex items-center justify-center", className)}
      >
        {preview ? (
          <img src={preview} className="h-full w-full" alt="preview-image" />
        ) : (
          <div className="flex h-40 w-40 items-center justify-center">
            Upload an image
          </div>
        )}
      </label>
    </>
  );
};
