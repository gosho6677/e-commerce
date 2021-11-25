import CreateEditForm from './CreateEditForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItemThunk, selectItemById } from './itemsSlice';
import useFormControls from '../../../hooks/useFormControls';

const Edit = ({ match, history }) => {
    const itemId = match.params.itemId;
    const item = useSelector(state => selectItemById(state, itemId));
    const {
        name, setName,
        category, setCategory,
        price, setPrice,
        imageUrl, setImageUrl,
        description, setDescription,
        validationHandler,
    } = useFormControls();
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            setName(old => ({ ...old, value: item.name }));
            setPrice(old => ({ ...old, value: item.price }));
            setImageUrl(old => ({ ...old, value: item.imageUrl }));
            setDescription(old => ({ ...old, value: item.description }));
            setCategory(item.category);
        }
    }, [item, setName, setCategory, setPrice, setImageUrl, setDescription]);

    const editItemHandler = e => {
        e.preventDefault();
        if (name.error || price.error || imageUrl.error || description.error) return;

        dispatch(editItemThunk({
            name: name.value,
            price: price.value,
            imageUrl: imageUrl.value,
            description: description.value,
            productId: itemId,
            category,
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
            validationHandler={validationHandler}
        />
    );
};

export default Edit;