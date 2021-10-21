import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
}) => {
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
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <FormControl>
                    <InputLabel id='category-label'>Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id='demo-simple-select-autowidth'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        label='Category'
                        name='category'
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
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <TextField
                    required
                    // fullWidth
                    id='imageUrl'
                    label='Image URL e.g. https://someimage.com'
                    name='imageUrl'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
                <TextareaAutosize
                    aria-label='empty textarea'
                    className='create-textarea'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
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