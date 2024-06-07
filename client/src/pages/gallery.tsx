import { useState } from 'react';
import json from '../assets/sample.json';
import ImageCard, { ImageObj } from '../components/sitewide/image-card';
import DetailView from '../components/sitewide/detail-view';

export default function Gallery(){
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageObj>({
        imageLink: "",
        prompt: "",
        userRequested: "",
        dateGenerated: "",
        uuid: ""
    });

    const handleOpenSlideover = (uuid: string) => {
        const image = json.find((image) => image.uuid === uuid);
        if (!image) return;
        setSelectedImage(image);
        setOpen(true);
    }
    return (
        <div >
                <DetailView imageObj={selectedImage} open={open} setOpen={setOpen}/>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
    
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {json.map((product) => (
                <ImageCard imageObj={product} handleOpenSlideover={(uuid) => handleOpenSlideover(uuid)} />
              ))}
            </div>
          </div>
        </div>
      )
}