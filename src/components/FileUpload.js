import "./FileUpload.css";
import { useState } from "react";

export default function FileUpload() {
    const [fileOverlayOpen, setFileOverlayOpen] = useState(false);

    return (
        <>
            <div className="message-attach" onClick={() => {
                setFileOverlayOpen(!fileOverlayOpen);
            }}>
                <span class="material-symbols-outlined">attach_file</span>
            </div>
            {fileOverlayOpen == true ? (
                <div className="file-upload-container">
                    <div className="file-upload-header">
                        <p>Upload Files</p>
                        <span
                            class="material-symbols-outlined"
                            onClick={() => {
                                setFileOverlayOpen(false);
                            }}
                        >
                            close
                        </span>
                    </div>
                    <div class="flex items-center justify-center w-full h-full file-content">
                        <label
                            for="dropzone-file"
                            class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 h-full"
                        >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                                <svg
                                    class="w-8 h-8 mb-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500">
                                    <span class="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p class="text-xs text-gray-500">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                class="hidden"
                            />
                        </label>
                    </div>
                </div>
            ) : null}
        </>
    );
}
