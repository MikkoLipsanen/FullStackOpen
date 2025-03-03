import express from 'express';
import { Request,Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatientEntry } from '../types';
import { NewEntrySchema } from '../utils';

import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
      NewEntrySchema.parse(req.body);
      console.log(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
};
  
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});
  
router.use(errorMiddleware);
  
export default router;