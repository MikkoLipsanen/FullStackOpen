import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

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

export default {
  getPatients,
  findById,
  getNonSensitiveEntries,
  addPatient
};