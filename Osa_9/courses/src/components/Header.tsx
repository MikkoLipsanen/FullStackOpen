interface NameProps {
    courseName: string;
}

const Header = ( props: NameProps ) => {
    return (
        <div>
            <h1>{props.courseName}</h1>
        </div>
)   
}

export default Header