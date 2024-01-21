export interface Filter<F> {
  page: number;
  pageSize: number;
  query: F;
}

// explici
export const DEFAULT_FILTER: Filter<any> = {
  page: 0,
  pageSize: 500,
  query: {},
};

/**
 * Base data provider interface that needs to be implemented by every data providers.
 * @template R Resource
 * @template F Filter
 */
export interface DataProvider<R = any, F = Record<string, string>> {
  getById(id: string): Promise<R>;
  getMany(filter: Filter<F>): Promise<R[]>;
  crupdateById(id: string, update: R): Promise<R>;
  crupdate(payload: R): Promise<R>;
  crupdateMany(toCrupdate: R[]): Promise<R[]>;
}
