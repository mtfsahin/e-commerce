import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router"


export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice
}) {
    console.log("existingTitle", existingTitle)
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setToGoProduct] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        const data = { title, description, price }
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

    return (
        <form onSubmit={saveProduct}>
            <label htmlFor="">Product Name</label>
            <input
                type="text"
                placeholder="product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
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