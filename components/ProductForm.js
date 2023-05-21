import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router"
import Loading from "./Loading";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImage,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImage || []);
    const [goToProducts, setToGoProduct] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        const data = { title , description, price, images }
        ev.preventDefault();
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });
        } else {
            //create
            await axios.post('/api/products', data);
        }
        setToGoProduct(true);
    }

    if (goToProducts) {
        router.push('/products');
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData;
            for (const file of files){
                data.append('file', file)
            }

            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images){
        setImages(images); 
    }

    return (
        <form onSubmit={saveProduct}>
            <label htmlFor="">Product Name</label>
            <input
                type="text"
                placeholder="product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)} 
            />
            <label>
                Photos
            </label>
            <div className="flex flex-wrap gap-1 mb-2">
            <ReactSortable 
                list={images} 
                setList={updateImagesOrder}
                className={'flex flex-wrap gap-1'}
            >
            {!!images?.length && images.map(link => (
                <div className="h-24 inline-block">
                    <img src={link} alt="" className="rounded-lg"/>
                </div>
            ))}
            </ReactSortable> 
            {isUploading && (
                <div className="flex items-center h-24">
                    <Loading/>
                </div>
            )}
            <label className="flex flex-col w-24 h-24 cursor-pointer text-center items-center justify-center text-sm gap-1 text-primary rounded-xl bg-white shadow-sm border border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <div>
                    Add image
                </div>
                <input type="file" onChange={uploadImages} className="hidden" />
            </label>
            </div>
            <label htmlFor="">Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)} />
            <label htmlFor="">Price(₺)</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)} />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}