import CreateEditForm from './CreateEditForm';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItemThunk, selectItemById } from "./itemsSlice";

const Edit = ({ match, history }) => {
    const itemId = match.params.itemId;
    const item = useSelector(state => selectItemById(state, itemId));
    const [name, setName] = useState(item.name || '');
    const [category, setCategory] = useState(item.category || '');
    const [price, setPrice] = useState(item.price || '');
    const [imageUrl, setImageUrl] = useState(item.imageUrl || '');
    const [description, setDescription] = useState(item.description || '');
    const dispatch = useDispatch();

    const editItemHandler = e => {
        e.preventDefault();
        dispatch(editItemThunk({
            name,
            category,
            price,
            imageUrl,
            description,
            productId: itemId
        }))
            .then(res => {
                if (res.error) {
                    return;
                }
                history.push(`/items/details/${itemId}`);
            });
    };

    return (
        <CreateEditForm
            submitItemHandler={editItemHandler}
            title='EDIT'
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

export default Edit;