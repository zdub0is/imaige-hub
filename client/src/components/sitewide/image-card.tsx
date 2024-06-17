
export type ImageObj = {
    link: string;
    prompt: string;
    userRequested: string;
    timeGenerated: string;
    uuid: string;
}

type ImageCardProps = {
    imageObj: ImageObj;
    
    handleOpenSlideover: (link: string) => void;
}

/**
 * This function is a singlular card that displays an image, prompt, user requested, and date generated. It is called from a map function in the ImageGallery component.
 */

export default function ImageCard({ imageObj, handleOpenSlideover }: ImageCardProps) {
    const { link, prompt, userRequested, timeGenerated, uuid } = imageObj;
    return (
        <div key={link} onClick={() => handleOpenSlideover(link)} className="cursor-pointer shadow-lg rounded-lg overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors ease-in-out">
            <div className="cursor-pointer shadow-lg rounded-lg overflow-hidden aspect-h-1 aspect-w-1">
            <img className="w-full h-full object-cover object-center group-hover:opacity-75" src={import.meta.env.VITE_BASE_URL+"/img/" + link} alt={prompt} />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-50">{prompt.length > 22 ? prompt.substring(0, 20) + '...' : prompt}</h3>
                <p className="text-sm text-gray-400">Requested by {userRequested}</p>
                <p className="text-sm text-gray-400">Generated on {new Date(timeGenerated).toDateString()}</p>
            </div>
        </div>
    )
}
        