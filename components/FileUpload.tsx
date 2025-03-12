"use client"

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { on } from "events";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";


const { env: {
  imagekit: { publickey, urlEndpoint },
} } = config;


const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, token, expire } = data;

    console.log("ImageKit authentication success", { signature, token, expire });

    return { signature, token, expire };

  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-white-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-ligth-100' : 'text-dark-500',
  }

  const onError = (error: any) => {
    console.error("Error uploading file", error);

    toast.error(`${type} upload failure`, {
      description: `Your ${type} counld not be uploaded. Please try again.`,
    });
  }

  const onSuccess = (res: any) => {
    console.log("File uploaded successfully", res);

    setFile(res);
    onFileChange(res.filePath);

    toast.success(`${type} uploaded successfully`, {
      description: `Your ${type} has been uploaded successfully.`,
    });
  }

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast.error(
          'File size too large',
          {
            description: 'Please upload a file is less than 20MB in size'
          }
        )
        return false
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(
          'File size too large',
          {
            description: 'Please upload a file is less than 50MB in size'
          }
        )
        return false;
      }
    }

    return true;
  }

  return (
    <ImageKitProvider publicKey={publickey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          console.log('IKUpload', { loaded, total, percent })
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>

        {file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file && (
        (type === 'image' ? (
          <IKImage
            path={file.filePath}
            alt={file.filePath}
            width={500}
            height={300}
          />) : type === 'video' ? (
            <IKVideo
              path={file.filePath}
              controls={true}
              className="h-96 w-full rounded-xl"
            />
          ) : null
        ))
      }
    </ImageKitProvider>
  )
}

export default FileUpload