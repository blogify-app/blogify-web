import {user1} from "./user.ts";

let unique = 0;

export const createUniqueEmail = () => {
  const gen = unique + user1().email!;
  unique++;
  return gen;
};
