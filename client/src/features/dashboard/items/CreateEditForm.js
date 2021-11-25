import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { useSelector } from 'react-redux';
import LoadingSpinner from '../../loading/LoadingSpinner';

const CreateEditForm = ({
    submitItemHandler,
    title,
    name,
    setName,
    category,
    setCategory,
    price,
    setPrice,
    imageUrl,
    setImageUrl,
    description,
    setDescription,
    validationHandler
}) => {
    const itemsStatus = useSelector(state => state.items.status);

    if(itemsStatus === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <Paper elevation={3} className='create-container'>
            <Box onSubmit={submitItemHandler} className='create-box' component='form'>
                <Typography variant='h5' className='create-title'>
                    {title}
                </Typography>
                <TextField
                    required
                    // fullWidth
                    id='name'
                    label='Item name'
                    name='name'
                    autoFocus
                    value={name.value}
                    error={name.error}
                    helperText={name.message}
                    onBlur={validationHandler('name')}
                    onChange={e => setName(old => ({ ...old, value: e.target.value }))}
                />

                <FormControl>
                    <InputLabel id='category-label'>Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id='demo-simple-select-autowidth'
                        label='Category'
                        name='category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <MenuItem value='phone'>Phone</MenuItem>
                        <MenuItem value='laptop'>Laptop</MenuItem>
                        <MenuItem value='tablet'>Tablet</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    // fullWidth
                    id='price'
                    label='Price'
                    name='price'
                    type='number'
                    value={price.value}
                    error={price.error}
                    helperText={price.message}
                    onBlur={validationHandler('price')}
                    onChange={e => setPrice(old => ({ ...old, value: Number(e.target.value) }))}
                />
                <TextField
                    required
                    // fullWidth
                    id='imageUrl'
                    label='Image URL e.g. https://someimage.com'
                    name='imageUrl'
                    value={imageUrl.value}
                    error={imageUrl.error}
                    helperText={imageUrl.message}
                    onBlur={validationHandler('imageUrl')}
                    onChange={e => setImageUrl(old => ({ ...old, value: e.target.value }))}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={400}
                    value={description.value}
                    error={description.error}
                    helperText={description.message}
                    onBlur={validationHandler('description')}
                    onChange={e => setDescription(old => ({ ...old, value: e.target.value }))}
                />
                <Button
                    type='submit'
                    variant='contained'
                    className='create-btn'
                >
                    SUBMIT
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateEditForm;