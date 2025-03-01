import Part from './Part';

interface contentProps {
    courseParts: { 
        name: string,
        kind:string, 
        exerciseCount: number,
        description?: string, 
        groupProjectCount?: number,
        backgroundMaterial?: string,
        requirements?: string[]
    }[];
}

const Content = ( props: contentProps ) => {
    return (
        <div>
            {props.courseParts.map(part => (                
                <Part key={part.name} coursePart={part} />
            ))}
        </div>
    )
};

export default Content