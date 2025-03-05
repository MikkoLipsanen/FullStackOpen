import { z } from 'zod';
import { NewPatientEntry, NewEntry, Gender, VisitType } from './types';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender), 
    occupation: z.string()
});

const SickLeave = z.object({
  startDate: z.string().date(),
  endDate: z.string().date()
});

const Discharge = z.object({
  date: z.string().date(),
  criteria: z.string()
});

export const NewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  type: z.nativeEnum(VisitType), 
  healthCheckRating: z.number().optional(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string().optional(),
  sickLeave: SickLeave.optional(),
  discharge: Discharge.optional()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};