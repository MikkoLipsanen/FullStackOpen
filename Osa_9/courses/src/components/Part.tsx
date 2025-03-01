interface contentProp {
    coursePart: {
        name: string
        kind:string, 
        exerciseCount: number,
        description?: string, 
        groupProjectCount?: number,
        backgroundMaterial?: string,
        requirements?: string[]
    }
}

const Part = ( props: contentProp ) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }

    switch(props.coursePart.kind) {
        case "basic": 
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p><i>{props.coursePart.description}</i></p>
                </div>
            )
            break;
        case "group": 
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p>project exercises {props.coursePart.groupProjectCount}</p>
                </div>
            )
            break;
        case "background": 
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p><i>{props.coursePart.description}</i></p>
                    <p>submit to {props.coursePart.backgroundMaterial}</p>
                </div>
            )
            break;
        case "requirements": 
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p><i>{props.coursePart.description}</i></p>
                    <p>required skills: {props.coursePart.requirements.join(", ")}   
                    </p>
                </div>
            )
            break;
        
        default:
            return assertNever(props.coursePart);
            break;
    }
};

export default Part