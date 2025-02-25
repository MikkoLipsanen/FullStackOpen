const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / (height / 100) ** 2;
    if (bmi < 16.0) {
        return "Underweight";
    } else if (bmi >= 16.0 && bmi <= 18.4) {
        return "Underweight";
    } else if (bmi >= 18.05 && bmi <= 24.9) {
        return "Normal weight";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        return "Normal weight";
    } else if (bmi >= 30.0) {
        return "Obese";
    }
}
  
console.log(calculateBmi(180, 74))