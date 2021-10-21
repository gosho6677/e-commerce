import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItemThunk } from './itemsSlice';
import CreateEditForm from './CreateEditForm';
import './Create.css';

const Create = ({ history }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('phone');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const createItemHandler = e => {
        e.preventDefault();
        dispatch(createItemThunk({ name, category, price, imageUrl, description }));
        history.push('/');
    };

    return (
        <CreateEditForm
            submitItemHandler={createItemHandler}
            title='CREATE'
            name={name}
            setName={setName}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            description={description}
            setDescription={setDescription}
        />
    );
};

export default Create;