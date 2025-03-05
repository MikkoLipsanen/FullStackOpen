import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from "../../types";

interface EntryProps {
  entry: Entry;
}

const OccupationalHealthcareEntry = ( props: EntryProps ) => {

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
            <MedicalServicesIcon color="secondary" />
            <div>{props.entry.description}</div>
            <FavoriteIcon color="secondary" />
            <div>diagnose by {props.entry.specialist}</div>
            { "sickLeave" in props.entry && (
                <>
                    <div>Sickleave start date: {props.entry.sickLeave?.startDate}</div>
                    <div>Sickleave end date: {props.entry.sickLeave?.endDate}</div>
                </>
            )}
        </div>
    );
};

export default OccupationalHealthcareEntry;