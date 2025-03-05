import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from "../../types";

interface EntryProps {
  entry: Entry;
}

const HealthCheckEntry = ( props: EntryProps ) => {

    const entryStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };
    
    return (
        <div style={entryStyle}>
            <div>{props.entry.date}</div>
            <MedicalServicesIcon color="primary" />
            <div>{props.entry.description}</div>
            <FavoriteIcon color="primary" />
            <div>diagnose by {props.entry.specialist}</div>
            <div>Health check rating: {props.entry.healthCheckRating}</div>
        </div>
    );
};

export default HealthCheckEntry;