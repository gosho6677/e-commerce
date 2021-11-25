import { useState } from "react";

// if (!name) {
//     errors.push('Name is required!');
// }
// if (description.length < 5) {
//     errors.push('Description must be atleast 5 characters!');
// }
// if (!category) {
//     errors.push('Please choose a category!');
// }
// if (price <= 0) {
//     errors.push('Price must be a valid positive number!');
// }
// if (!imageUrl.startsWith('https://')) {
//     errors.push('Please provide a valid image URL!');
// }

const useFormControls = () => {
    const [name, setName] = useState({ value: '', message: '', error: false });
    const [price, setPrice] = useState({ value: 1, message: '', error: false });
    const [imageUrl, setImageUrl] = useState({ value: '', message: '', error: false });
    const [description, setDescription] = useState({ value: '', message: '', error: false });
    const [category, setCategory] = useState('phone');

    const validationHandler = (state) => () => {
        if (state === 'name') {
            if (name.value.length < 3) {
                setName(state => ({
                    ...state,
                    message: 'Name should be atleast 3 characters long!',
                    error: true,
                }));
            } else {
                setName(state => ({ ...state, message: '', error: false }));
            }
        } else if (state === 'price') {
            if (price.value <= 0) {
                setPrice(state => ({
                    ...state,
                    message: 'Price must be a positive integer!',
                    error: true,
                }));
            } else {
                setPrice(state => ({ ...state, message: '', error: false }));
            }
        } else if (state === 'imageUrl') {
            if (!imageUrl.value.startsWith('https://')) {
                setImageUrl(state => ({
                    ...state,
                    message: 'Please provide a valid HTTPS image URL!',
                    error: true,
                }));
            } else {
                setImageUrl(state => ({ ...state, message: '', error: false }));
            }
        } else if (state === 'description') {
            if (description.value.length < 5) {
                setDescription(state => ({
                    ...state,
                    message: 'Description must be atleast 5 characters!',
                    error: true,
                }));
            } else {
                setDescription(state => ({ ...state, message: '', error: false }));
            }
        }
    };

    return {
        name, setName,
        category, setCategory,
        price, setPrice,
        imageUrl, setImageUrl,
        description, setDescription,
        validationHandler,
    };
};

export default useFormControls;