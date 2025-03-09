"use client"

import config from "@/lib/config";
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


const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string } | null>(null);

    const onError = (error: any) => {
        console.error("Error uploading file", error);

        toast.error("Error uploading file", {
            description: 'Your image counld not be uploaded. Please try again.',
        });
    }

    const onSuccess = (res: any) => {
        console.log("File uploaded successfully", res);

        setFile(res);
        onFileChange(res.filePath);

        toast.success("File uploaded successfully", {
           description: 'Your image has been uploaded successfully.',
        });
    }

    return (
        <ImageKitProvider publicKey={publickey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <IKUpload
                className="hidden"
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName="test-upoad.jpg"
            />

            <button className="upload-btn"
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

                <p className="text-base text-light-100">Upload a file</p>

                {file && <p className="upload-filename">{file.filePath}</p>}
            </button>

            {file && (
                <IKImage
                    path={file.filePath}
                    alt={file.filePath}
                    width={500}
                    height={300}
                />
            )}
        </ImageKitProvider>
    )
}

export default ImageUpload