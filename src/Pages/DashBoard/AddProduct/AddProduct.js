import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const imgbb = process.env.REACT_APP_imgbb_key;

    const handleAddProduct = (data, e) => {
        setLoading(true);
        // console.log(data);
        const { productName, productPhoto, location, category, condition, resalePrice, originalPrice, phone, description, purchaseYear, } = data;
        fetch(`http://localhost:5000/categories?category=${category}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                const categoryId = data._id;
                const categoryName = data.categoryName;
                const photo = productPhoto[0];
                // console.log(photo);
                const formData = new FormData();
                formData.append('image', photo);
                fetch(`https://api.imgbb.com/1/upload?key=${imgbb}`, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        // console.log(imgData);
                        if (imgData.success) {
                            const product = {
                                productName,
                                productPhoto: imgData.data.url,
                                location,
                                resalePrice,
                                originalPrice,
                                sellerEmail: user.email,
                                categoryId,
                                categoryName,
                                condition,
                                sellerPhone: phone,
                                description,
                                purchaseYear,
                                isSold: false,
                                isAdvertised: false,
                                isPaid: false
                            }
                            fetch('http://localhost:5000/products', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(product)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    // console.log(data);
                                    setUploaded(!uploaded);
                                    toast.success('Product added Successfully');
                                    setLoading(false);
                                    navigate('/dashboard/myProducts')
                                })
                                .catch(e => {
                                    console.error(e);
                                    toast.error('Could not add the product');
                                })
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        toast.error('Could not add the product');
                    })
            })
            .catch(e => {
                console.error(e);
                toast.error('Could not add the product');
            })
    }

    useEffect(() => {
        reset({
            productName: '',
            productPhoto: '',
            location: '',
            resalePrice: '',
            originalPrice: '',
            phone: '',
            description: '',
            purchaseYear: '',
        })
    }, [uploaded])

    if (loading) {
        return <div className='flex justify-center items-center w-full my-12 min-h-[90vh]'>
            <progress className="progress progress-primary w-56"></progress>
        </div>
    }


    return (
        <div className='w-11/12 mx-auto my-8'>
            <h1 className='text-2xl font-semibold text-primary text-center'>Add Product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)} className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input {...register("productName", { required: true })} type="text" className="input input-bordered w-full" />
                    {errors.productName && errors.productName.type === "required" && <p className='mt-2 text-error'>⚠ Product Name is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Photo</span>
                    </label>
                    <input {...register("productPhoto", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                    {errors.productPhoto && errors.productPhoto.type === "required" && <p className='mt-2 text-error'>⚠ Product Photo is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input {...register("location", { required: true })} type="text" className="input input-bordered w-full" />
                    {errors.location && errors.location.type === "required" && <p className='mt-2 text-error'>⚠ Location is required</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input {...register("resalePrice", { required: true })} type="number" className="input input-bordered w-full" />
                    {errors.resalePrice && errors.resalePrice.type === "required" && <p className='mt-2 text-error'>⚠ Resale price is required</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input {...register("originalPrice", { required: true })} type="number" className="input input-bordered w-full" />
                    {errors.originalPrice && errors.originalPrice.type === "required" && <p className='mt-2 text-error'>⚠ Original price is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select Product Category</span>
                    </label>
                    <select {...register("category", { required: true })} className="select select-bordered">
                        <option value="Electric Guitars">Electric Guitars</option>
                        <option value="Acoustic Guitars">Acoustic Guitars</option>
                        <option value="Ukuleles">Ukuleles</option>
                    </select>
                    {errors.category && errors.category.type === "required" && <p className='mt-2 text-error'>⚠ Category is required</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select Product Condition</span>
                    </label>
                    <select {...register("condition", { required: true })} className="select select-bordered">
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                    {errors.condition && errors.condition.type === "required" && <p className='mt-2 text-error'>⚠ Product condition is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Your Phone Number</span>
                    </label>
                    <input {...register("phone", { required: true })} type="text" className="input input-bordered w-full" />
                    {errors.phone && errors.phone.type === "required" && <p className='mt-2 text-error'>⚠ Phone Number is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Short Description of Product</span>
                    </label>
                    <textarea {...register("description", { required: true })} type="text" className="textarea textarea-bordered"></textarea>
                    {errors.description && errors.description.type === "required" && <p className='mt-2 text-error'>⚠ Description is required</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Year of Purchase</span>
                    </label>
                    <input {...register("purchaseYear", { required: true })} type="date" className="input input-bordered w-full" />
                    {errors.purchaseYear && errors.purchaseYear.type === "required" && <p className='mt-2 text-error'>⚠ Year of Purchase is required</p>}
                </div>

                <input className='btn btn-primary mt-4 w-full col-span-1 lg:col-span-2' type="submit" value={'Add Product'} />
            </form>
        </div>
    );
};

export default AddProduct;