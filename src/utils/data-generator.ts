import { faker } from "@faker-js/faker";

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  password: string;
  privacyPolicy: boolean;
}

export const generateUser = () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  telephone: faker.phone.number(),
  password: faker.internet.password({ length: 12 }),
  privacyPolicy: true,
});
