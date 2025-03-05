import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Diagnosis, Patient, NonSensitivePatientEntry, NewPatientEntry, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };


const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const addEntry = ( entry: NewEntry, id: string ): Entry => {
  const newEntry = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      diagnosisCodes: parseDiagnosisCodes(entry),
      ...entry,
  } as Entry;

  const patient = patients.find(p => p.id === id);
  if (!patient || !patient.entries) {
    throw new Error(`Patient with id ${id} not found or entries are undefined`);
  }
  patient.entries.push(newEntry);
  
  return newEntry;
};

export default {
  getPatients,
  findById,
  getNonSensitiveEntries,
  addPatient, 
  addEntry
};