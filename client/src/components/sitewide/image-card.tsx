
export type ImageObj = {
    imageLink: string;
    prompt: string;
    userRequested: string;
    dateGenerated: string;
    uuid: string;
}

type ImageCardProps = {
    imageObj: ImageObj;
    
    handleOpenSlideover: (uuid: string) => void;
}

/**
 * This function is a singlular card that displays an image, prompt, user requested, and date generated. It is called from a map function in the ImageGallery component.
 */

export default function ImageCard({ imageObj, handleOpenSlideover }: ImageCardProps) {
    const { imageLink, prompt, userRequested, dateGenerated, uuid } = imageObj;
    return (
        <div key={uuid} onClick={() => handleOpenSlideover(uuid)} className="cursor-pointer shadow-lg rounded-lg overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors ease-in-out">
            <div className="cursor-pointer shadow-lg rounded-lg overflow-hidden aspect-h-1 aspect-w-1">
            <img className="w-full h-full object-cover object-center group-hover:opacity-75" src={imageLink} alt={prompt} />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-50">{prompt.length > 22 ? prompt.substring(0, 20) + '...' : prompt}</h3>
                <p className="text-sm text-gray-400">Requested by {userRequested}</p>
                <p className="text-sm text-gray-400">Generated on {dateGenerated}</p>
            </div>
        </div>
    )
}
        