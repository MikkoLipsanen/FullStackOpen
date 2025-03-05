import { z } from 'zod';
import { NewPatientSchema, NewEntrySchema } from './utils';

export enum VisitType {
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    type: VisitType;
    diagnosisCodes?: Array<Diagnosis['code']>;
}
  
interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating;
}
  
interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: {startDate: string, endDate: string}
}
  
interface HospitalEntry extends BaseEntry {
    discharge: {date: string, criteria: string};
}
  
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
}

export type NewEntry = z.infer<typeof NewEntrySchema>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;