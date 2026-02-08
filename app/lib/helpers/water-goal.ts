import AsyncStorage from "@react-native-async-storage/async-storage";

export type Gender = "male" | "female";
export type HeightUnit = "cm" | "inch";
export type WeightUnit = "kg" | "pounds";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "high";
export type Climate = "cold" | "temperate" | "tropical";
export default function calculateWaterGoal(
  age: number,
  gender: Gender,
  height: number,
  heightUnit: HeightUnit,
  weight: number,
  weightUnit: WeightUnit,
  activityLevel: ActivityLevel,
  climate: Climate,
) {
  //  Convert heights and weights to normal metrics intermittently
  if (heightUnit === "inch") {
    height = height * 2.54;
  }

  if (weightUnit === "pounds") {
    weight = weight * 0.453592;
  }

  // now the weight and height are in kg and cm.
  // calculate in terms of L

  // daily water (ml) = base * height factor * activity factor * climate factor
  // base = weight * gender factor * age factor

  const genderFactor = gender === "male" ? 35 : 31;
  const ageFactor = age < 30 ? 1 : age < 55 ? 1.0 : 1.1;
  const base = weight * genderFactor * ageFactor;

  // shorter, need less
  // around 1.0
  const heightFactor = 0.9 + height / 500;

  // activity factor
  const activityFactors = {
    sedentary: 1.0,
    light: 1.15,
    moderate: 1.3,
    high: 1.5,
  };
  const activityFactor = activityFactors[activityLevel];

  // climate factor
  const climateFactors = {
    cold: 1.0,
    temperate: 1.0,
    tropical: 1.15,
  };
  const climateFactor = climateFactors[climate];

  const dailyTargetML = base * heightFactor * activityFactor * climateFactor;

  return dailyTargetML;
}

export const calculateWaterTargetFromStorage = async (): Promise<number> => {
  try {
    const gender = (await AsyncStorage.getItem("gender")) as Gender;
    const age = Number(await AsyncStorage.getItem("age"));
    const height = Number(await AsyncStorage.getItem("height"));
    const heightUnit = (await AsyncStorage.getItem("heightUnit")) as HeightUnit;
    const weight = Number(await AsyncStorage.getItem("weight"));
    const weightUnit = (await AsyncStorage.getItem("weightUnit")) as WeightUnit;
    const activityLevel = (await AsyncStorage.getItem(
      "activityLevel",
    )) as ActivityLevel;
    const climate = (await AsyncStorage.getItem("climate")) as Climate;

    const dailyTargetML = calculateWaterGoal(
      age,
      gender,
      height,
      heightUnit,
      weight,
      weightUnit,
      activityLevel,
      climate,
    );

    return Math.round(dailyTargetML);
  } catch (error) {
    console.error("Error calculating water target:", error);
    return 2500;
  }
};
