/**
 * Function that does nothing that we can use to replace optional fn props to avoid NPE
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NOOP_FN = (..._args: unknown[]) => {
  return {} as never;
};
