const ReviewOrderStage = ({ changeStageHandler }) => {
    return (
        <>
            <h2>stage 3</h2>
            <button onClick={changeStageHandler(2)}>Back</button>
        </>
    );
};

export default ReviewOrderStage;