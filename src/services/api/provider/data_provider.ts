export interface Filter<R> {
  page: number;
  pageSize: number;
  query: R;
}

// intentionally type query record as 'any' so it is compatible with any filter
export const DEFAULT_FILTER: Filter<any> = {
  page: 0,
  pageSize: 500,
  query: {},
};

/**
 * Base data provider interface that needs to be implemented by every data providers.
 *
 * @template R - Resource type
 * @template F - Filter record
 */
export interface DataProvider<R = any, F = Record<string, string>> {
  getById(id: string): Promise<R>;
  getMany(filter: Filter<F>): Promise<R[]>;
  crupdateById(id: string, update: R): Promise<R>;
  crupdate(payload: R): Promise<R>;
  crupdateMany(toCrupdate: R[]): Promise<R[]>;
}
