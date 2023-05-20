import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function NewProduct() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goProducts,setGoProduct] = useState(false);
  
    async function createProduct(ev) {
        ev.preventDefault();
        const data = {title,description,price}
        await axios.post('/api/products', data);
        setGoProduct(true);
    }

    if(goProducts) {
        return Router
    }

    return (
        <form onSubmit={createProduct}>
            <Layout>
                <h1>New Product</h1>
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
            </Layout>
        </form>
    )
}