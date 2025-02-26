interface ExerciseArgs {
    targetHours: number;
    dailyHours: number[];
  }
  
const parseExerciseArguments = (args: string[]): ExerciseArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const dailyHours = args.slice(3).map(n => Number(n));
    const targetHours = Number(args[2]);

    dailyHours.every(e => !isNaN(e));
  
    if (!isNaN(targetHours) && dailyHours.every(e => !isNaN(e))) {
      return {
        targetHours: targetHours,
        dailyHours: dailyHours
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

interface Rating {
    rating: number,
    ratingDescription: string
}

const getRating = (average: number, target: number): Rating => {
    if (average / target >= 0.7) {
        return {rating: 2, ratingDescription: "not too bad but could be better"};
    } else if (average / target < 0.7) {
        return {rating: 1, ratingDescription: "plenty of room for improvement"};
    } else if ( average / target < 1.2) {
        return {rating: 3, ratingDescription: "great job, target achieved"};
    } else  {
        return {rating: 3, ratingDescription: "you are ready for the olympics!"};
    }
};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
  
export const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(d => d !== 0).length;
    const average = dailyHours.reduce((a, b) => a + b) / periodLength;
    const success = average >= targetHours;
    const rating = getRating(average, targetHours);
  
    const res = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating.rating,
        ratingDescription: rating.ratingDescription,
        target: targetHours,
        average: average
    };
    return res;
};

if (require.main === module) {
    try {
        const { targetHours, dailyHours } = parseExerciseArguments(process.argv);
        console.log(calculateExercises(dailyHours, targetHours));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}