import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
  
const PatientPage = ( ) => {
  const [patient, setPatient] = useState<Patient | null>(null);
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

    return (
      <div>
        {patient ? (
          <>
            <h2>{patient.name}</h2>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>Entries:</h3>
            {patient.entries && patient.entries.map(entry => 
              <div key={entry.id}>
                <div>{entry.date}: {entry.description}</div>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((code: string) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        ) : (
          <p>Patient not found</p>
        )}
      </div>
    )
};

export default PatientPage;