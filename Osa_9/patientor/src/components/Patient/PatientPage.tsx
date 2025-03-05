import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Alert } from '@mui/material';
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues, Diagnosis } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC <{ entry: Entry }> = ({ entry }) => {
  switch(entry.type){
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

interface Props {
  diagnoses: Diagnosis[];
}
  
const PatientPage = ( { diagnoses }: Props ) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const entry = await patientService.addEntry(values, id);
        if (patient && patient.entries) {
          const updatedPatient = {...patient, entries: patient.entries.concat(entry)};
          setPatient(updatedPatient);
        } else {
          throw new Error("Patient or patient entries are undefined");
        }
      } else {
        throw new Error("Patient ID is undefined");
      }
    } catch (e: unknown) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {patient ? (
          <>
            <h2>{patient.name}</h2>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <div>
              <AddEntryForm onSubmit={submitNewEntry} diagnoses={diagnoses} />
            </div>
            <h3>Entries:</h3>
            {patient.entries && patient.entries.map(entry => 
              <EntryDetails key={entry.id} entry={entry} />
            )}
          </>
        ) : (
          <p>Patient not found</p>
        )}
      </div>
    );
};

export default PatientPage;