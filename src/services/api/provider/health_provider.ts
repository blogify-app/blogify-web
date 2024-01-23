import {healthApi} from "@/services/api";

export interface HealthProvider {
  ping(): Promise<string>;
}

export const HealthProvider: HealthProvider = {
  async ping(): Promise<string> {
    return (await healthApi().ping()).data;
  },
};
