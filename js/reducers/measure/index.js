import { createReducer } from 'reduxsauce';

import { Types } from '../../actions/measure';

export const initialState = { saving: false };

export const handlers = {
  [Types.SAVE_MEASURE]: state => ({ ...state, saving: true }),
  [Types.MEASURE_SAVED]: state => ({ ...state, saving: false }),
};

export default createReducer(initialState, handlers);
