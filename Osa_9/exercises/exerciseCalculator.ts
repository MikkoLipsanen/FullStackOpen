interface Rating {
    rating: number,
    ratingDescription: string
}

const getRating = (average: number, target: number): Rating => {
    if ((target - average) > 0 && average / target >= 0.7) {
        return {rating: 2, ratingDescription: "not too bad but could be better"};
    } else if ((target - average) > 0 && average / target < 0.7) {
        return {rating: 1, ratingDescription: "plenty of room for improvement"};
    } else if ((average - target) >= 0 && average / target < 1.2) {
        return {rating: 3, ratingDescription: "great job, trget achieved"};
    } else if ((average - target) >= 0 && average / target > 1.2) {
        return {rating: 3, ratingDescription: "you are ready for the olympics!"};
    }
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
  
const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(d => d !== 0).length
    const average = dailyHours.reduce((a, b) => a + b) / periodLength;
    const success = average >= targetHours;
    const rating = getRating(average, targetHours)
  
    const res = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating.rating,
        ratingDescription: rating.ratingDescription,
        target: targetHours,
        average: average
    }
    return res
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))