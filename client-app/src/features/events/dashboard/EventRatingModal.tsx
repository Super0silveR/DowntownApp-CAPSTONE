import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { styled, Rating, Typography, Stack, Box, Divider, Button } from "@mui/material";
import { Rating as EventRating } from '../../../app/models/event';
import TextInput from "../../../app/common/form/TextInput";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import FormContainer from "../../../app/common/form/FormContainer";
import { LoadingButton } from "@mui/lab";
import { useStore } from "../../../app/stores/store";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

interface Props {
    rating: EventRating;
}

const EventRatingModal = ({ rating }: Props) => {

    const { modalStore } = useStore();

    function handleRatingChange(value: number | null) {
        console.log(value);
    }

    return (
        <FormContainer
            title='Rate This Event'
            form={
                <Formik
                    initialValues={{}}
                    onSubmit={(values) => {
                        //TODO: Implement saving profile logic.
                        console.log(values);
                    }}
                >
                    {({handleSubmit, isSubmitting}) => (
                        <Form
                            className='ui-form'
                            onSubmit={handleSubmit}
                            autoComplete='off'
                        >
                            <Stack direction='column' spacing={3}>
                                <Box>
                                    <StyledRating
                                        disabled={false}
                                        name="customized-color"
                                        defaultValue={0}
                                        value={rating.value}
                                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={0.1}
                                        icon={<Favorite fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorder fontSize="inherit" />}
                                        onChange={(_, value) => handleRatingChange(value)} />
                                    <Typography
                                        className={"MuiTypography--subheading"}
                                        variant={"caption"}
                                        sx={{
                                            color: '#000',
                                            verticalAlign: 'top',
                                            fontFamily: 'monospace'
                                        }}
                                    >
                                        ({(rating.count !== 0) ? rating.count : 'N/A'})
                                    </Typography>
                                </Box>  
                                <TextInput name="review" placeholder="Type your review." />
                            </Stack>
                            <Divider sx={{width:'50%'}} />
                            <Stack direction='row' spacing={2} mt={2}>
                                <LoadingButton sx={{
                    background: 'linear-gradient(135deg, #C75172, #C85DA3)'}}
                                    loading={isSubmitting}
                                    variant='contained' 
                                    fullWidth 
                                    type="submit"
                                >
                                    <Typography fontFamily='monospace'>Save</Typography>
                                </LoadingButton>
                                <Button onClick={() => modalStore.closeModal()} sx={{
                    background: 'linear-gradient(135deg, #785e7d, #2D1693)'}} variant="contained" fullWidth>
                                    <Typography fontFamily='monospace'>Cancel</Typography>
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            }
            minWidth={150}
        />
    );
}

export default EventRatingModal;