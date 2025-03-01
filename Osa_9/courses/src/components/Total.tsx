interface TotalProps {
    totalExercises: number;
}

const Total = ( props: TotalProps ) => {

    return (
        <div>
            Number of exercises {props.totalExercises}
        </div>
)   
}

export default Total