import { faker } from "@faker-js/faker";
import { format } from "date-fns";

const STATE_CITY_MAP = {
  NCR: ["Delhi", "Gurgaon", "Noida"],
  "Uttar Pradesh": ["Agra", "Merrut", "Lucknow"],
  Haryana: ["Karnal", "Panipat"],
  Rajasthan: ["Jaipur", "Jaiselmer"],
};

const SUBJECTS = [
  "Hindi",
  "English",
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Commerce",
  "Accounting",
  "Economics",
  "Arts",
  "Social Studies",
  "History",
  "Civics",
];

const HOBBIES = ["Sports", "Reading", "Music"];

const GENDERS = ["Male", "Female", "Other"];

export function generateFormData() {
  const dateOfBirth = faker.date.past();
  const state = faker.helpers.objectKey(STATE_CITY_MAP);
  const city = faker.helpers.arrayElement(STATE_CITY_MAP[state]);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(GENDERS),
    subjects: faker.helpers.arrayElements(SUBJECTS, 3),
    phoneNumber: faker.string.numeric(10),
    dateOfBirth: dateOfBirth,
    formattedDateOfBirth: format(dateOfBirth, "dd MMM yyyy"),
    dateOfBirthReport: format(dateOfBirth, "dd MMMM,yyyy"),
    hobbies: faker.helpers.arrayElement(HOBBIES),
    address: faker.location.streetAddress(),
    state: state,
    city: city,
  };
}
