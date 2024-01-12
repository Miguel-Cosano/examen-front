import { useEffect, useRef } from "react"

const UploadWidget = ({setImageUrl}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`,
            uploadPreset: `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_NAME}`
        }, function(error, result) {
            if (result.event === 'success') {
                setImageUrl(result.info.secure_url)
            }
        })
    }, [])
    return(
        <button type="button" className="btn btn-primary" onClick={() => widgetRef.current.open()}>
            Subir imagen
        </button>

    )
}

export default UploadWidget