import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
}

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;