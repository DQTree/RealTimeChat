import React, {ChangeEvent, useRef, useState} from 'react';
import {
    Cropper,
    CropperRef, CropperPreviewRef, CircleStencil,
} from 'react-advanced-cropper';

import 'react-advanced-cropper/dist/style.css'

import './style.css'

export default function ImageCropper({ setServerIcon }: { setServerIcon: (image: string) => void }) {
    const previewRef = useRef<CropperPreviewRef>(null);
    const cropperRef = useRef<CropperRef>(null);

    const [src, setSrc] = useState("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const newSrc = event.target.result.toString();
                setSrc(newSrc);
                cropperRef.current?.reset();
            }
        };
        reader.readAsDataURL(file);
    }

    const onUpdate = () => {
        previewRef.current?.refresh();
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            setServerIcon(canvas.toDataURL())
        }
    };

    const onSave = () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    const anchor = document.createElement('a');
                    anchor.href = URL.createObjectURL(blob);
                    anchor.download = 'cropped_image.png';
                    anchor.click();
                    URL.revokeObjectURL(anchor.href);
                }
            }, 'image/png');
        }
    };

    const onClear = () => {
        cropperRef.current?.reset();
        setServerIcon("")
    };

    const onOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            setServerIcon(canvas.toDataURL())
        }
    };

    return (
        <div id="image-container">
            <div id="image-preview">
                <Cropper
                    ref={cropperRef}
                    className="cropper"
                    stencilProps={{aspectRatio: 1}}
                    src={src}
                    onUpdate={onUpdate}
                    stencilComponent={CircleStencil}
                />
                {/*
                <CropperPreview
                    ref={previewRef}
                    cropper={cropperRef}
                    className="preview"
                />
                */}
            </div>
            <input type='file' accept="image/*" onChange={handleFileChange}/>
            {/*<button onClick={onClear}>Clear</button>*/}
            {/*<button onClick={onSave}>Save</button>*/}
            {/*<button onClick={e => onOk(e)}>Set</button>*/}
        </div>
    );
};
