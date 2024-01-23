import {healthApi} from "@/services/data_provider";

export interface HealthProvider {
  ping(): Promise<string>;
}

export const healthProvider: HealthProvider = {
  async ping(): Promise<string> {
    return (await healthApi().ping()).data;
  },
};
