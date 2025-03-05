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
  type: VisitType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: VisitType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {startDate: string, endDate: string}
}

interface HospitalEntry extends BaseEntry {
  type: VisitType.Hospital;
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
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
  entries?: Entry[];
}

export interface EntryFormValues {
  description: string;
  date: string;
  specialist: string;
  type: VisitType;
  healthCheckRating?: HealthCheckRating;
  diagnosisCodes?: Array<Diagnosis['code']>;
  employerName?: string;
  sickLeave?: {startDate: string, endDate: string}
  discharge?: {date: string, criteria: string};
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;