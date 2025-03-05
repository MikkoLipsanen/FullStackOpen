import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from "../../types";

interface EntryProps {
  entry: Entry;
}

const HospitalEntry = ( props: EntryProps ) => {

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
            <MedicalServicesIcon color="info" />
            <div>{props.entry.description}</div>
            <FavoriteIcon color="info" />
            <div>diagnose by {props.entry.specialist}</div>
            { "discharge" in props.entry && (
                <>
                    <div>Discharge date: {props.entry.discharge.date}</div>
                    <div>Discharge criteria: {props.entry.discharge.criteria}</div>
                </>
            )}
        </div>
    );
};

export default HospitalEntry;