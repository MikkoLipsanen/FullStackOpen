import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({error: "malformatted parameters"});
    } else {
        const bmi = calculateBmi(height, weight);
        const resp = {
            weight: weight,
            height: height,
            bmi: bmi
        };
        res.json(resp);
    };
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (daily_exercises && target) {
        try {
            const dailyExercises = daily_exercises.map((n: any) => Number(n));;
            const dailyTarget = Number(target);
            const resp = calculateExercises(dailyExercises, dailyTarget);
            res.json(resp);
        } catch (error: unknown) {
            res.status(400).json({error: "malformatted parameters"});
        }
    } else {
        res.status(400).json({error: "parameters missing"});
    }
        
        


});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});