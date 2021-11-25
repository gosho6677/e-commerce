import { useDispatch } from 'react-redux';
import { createItemThunk } from './itemsSlice';
import CreateEditForm from './CreateEditForm';
import './Create.css';
import useFormControls from '../../../hooks/useFormControls';

const Create = ({ history }) => {
    const dispatch = useDispatch();
    const {
        name, setName,
        category, setCategory,
        price, setPrice,
        imageUrl, setImageUrl,
        description, setDescription,
        validationHandler,
    } = useFormControls();

    const createItemHandler = e => {
        e.preventDefault();
        if (name.error || price.error || imageUrl.error || description.error) return;

        dispatch(createItemThunk({
            name: name.value,
            price: price.value,
            imageUrl: imageUrl.value,
            description: description.value,
            category,
        }))
            .then((res) => {
                if (res.error) {
                    return;
                }
                history.push('/');
            });

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
            validationHandler={validationHandler}
        />
    );
};

export default Create;