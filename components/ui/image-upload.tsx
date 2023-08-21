"use client"

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";


interface ImageUploadProps {
    disabled?: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    value: string[];
}

const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    //prevent hydration error
    if (!isMounted) {
        return null;
    }
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        {/* <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={url}
                        /> */}
                        <div className="w-auto h-[200px]">
                            <div className="object-contain w-full h-full flex justify-center items-center p-2">
                                <Image
                                    src={url}
                                    alt="Image"
                                    sizes="100vw"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    width={500}
                                    height={300}
                                    className='self-center'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset= {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload