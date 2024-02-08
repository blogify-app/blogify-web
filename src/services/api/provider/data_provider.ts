export interface Query<R = Record<string, any>> {
  page: number;
  pageSize: number;
  params: R;
}

// intentionally type query record as 'any' so it is compatible with any filter
export const DEFAULT_QUERY: Query<any> = {
  page: 1,
  pageSize: 500,
  params: {},
};

/**
 *
 * Base data provider interface that needs to be implemented by every data providers.
 *
 * @template R - Resource type
 * @template P - Filter record
 */
export interface DataProvider<R = any, P = Record<string, any>> {
  getById(id: string | undefined, query?: Query<P>): Promise<R>;
  getMany(query: Query<P>): Promise<R[]>;
  crupdateById(id: string, update: R, query?: Query<P>): Promise<R>;
  crupdate(payload: R, query?: Query<P>): Promise<R>;
  crupdateMany(toCrupdate: R[], query?: Query<P>): Promise<R[]>;
  deleteById(id: string, query?: Query<P>): Promise<R>;
}
