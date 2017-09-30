import { createTypes } from 'reduxsauce';

type MeasureActionTypes = {
  SAVE_MEASURE: string,
};

export type Measure = {
  values: { [x: string]: number },
  infos: {
    client: {
      name: string,
      phone: string,
    },
    notes: string,
  },
  images: Array<string>,
};

export const Types: MeasureActionTypes = createTypes(
  `
  SAVE_MEASURE
`,
  { prefix: 'measure/' },
);

export const saveMeasure = (measure: Measure) => ({ type: Types.SAVE_MEASURE, measure });
