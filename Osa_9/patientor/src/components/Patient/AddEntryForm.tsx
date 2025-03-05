import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';
import { EntryFormValues, VisitType, HealthCheckRating, Diagnosis } from "../../types";
import { SelectRating, SelectType, SelectCode } from './Selectors';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<VisitType>(VisitType.HealthCheck);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const resetState = () => {
    setDescription('');
    setDate('');
    setType(VisitType.HealthCheck);
    setSpecialist('');
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      type,
      diagnosisCodes
    };
    if (type === VisitType.HealthCheck) {
      onSubmit({ 
        ...baseEntry, 
        "healthCheckRating": healthCheckRating 
      });
    } else if (type === VisitType.OccupationalHealthcare) {
      onSubmit({ 
        ...baseEntry, 
        "employerName": employerName,
        "sickLeave": {
          "startDate": sickLeaveStartDate, 
          "endDate": sickLeaveEndDate
        }  
      });
    } else {
      onSubmit({ 
        ...baseEntry, 
        "employerName": employerName,
        "discharge": {
          "date": dischargeDate, 
          "criteria": dischargeCriteria
        }  
      });
    }
    resetState();
  };

  const codeList = diagnoses.map(d => d.code);

  const entryFormStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 40,
    border: 'dashed',
    borderWidth: 2,
    marginBottom: 15
  };
 
  return (
    <div style={entryFormStyle}>
      <h2>New entry</h2>
      <form onSubmit={addEntry}>
        <SelectType
          label="Visit type"
          items={[VisitType.HealthCheck, VisitType.OccupationalHealthcare, VisitType.Hospital]}
          value={type}
          changeValue={setType}
        />
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <SelectCode
          label="Diagnosis codes"
          items={codeList}
          value={diagnosisCodes}
          changeValue={setDiagnosisCodes}
        />
        {type === VisitType.HealthCheck &&
          <SelectRating
            label="Healthcheck rating"
            items={[0,1,2,3]}
            value={healthCheckRating}
            changeValue={setHealthCheckRating}
          />
        }
        {type === VisitType.OccupationalHealthcare &&
          <div>
            <TextField
              label="Employer"
              fullWidth 
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <h4>Sickleave</h4>
            <TextField
              label="start"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="end"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </div>
        }
        {type === VisitType.Hospital &&
          <div>
            <h4>Discharge</h4>
            <TextField
              label="date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        }

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={resetState}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;