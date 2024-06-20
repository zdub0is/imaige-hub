import { useEffect, useState } from 'react';
import ImageCard, { ImageObj } from '../components/sitewide/image-card';
import DetailView from '../components/sitewide/detail-view';

export default function Gallery() {
  const [gallery, setGallery] = useState<[ImageObj]>();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageObj>({
    link: "",
    prompt: "",
    userRequested: "",
    timeGenerated: "",
    uuid: ""
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/gallery", {
      method: "GET",

      credentials: 'include',
    })
      .then(res => res)
      .then(data => {
        return data.json()
      }).then((data) => {
        setGallery(data);
      })

  }, [])

  const handleOpenSlideover = (link: string) => {
    const image = gallery?.find((image) => image.link === link);
    if (!image) return;
    setSelectedImage(image);
    setOpen(true);
  }
  return (
    <div >
      <DetailView imageObj={selectedImage} open={open} setOpen={setOpen} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            gallery ?

              gallery?.map((product) => (
                <ImageCard imageObj={product} handleOpenSlideover={(link) => handleOpenSlideover(link)} />
              ))
              : ""
          }

        </div>
      </div>
    </div>
  )
}