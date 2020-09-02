import { TimeData, TimeInitialData } from '../../interfaces/time-t';
import { TimeHelpActionTypes, ActionEx } from '../actions/time-help.actions';

export const initialState = TimeInitialData;
// tslint:disable-next-line:typedef
export function TimeHelpReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case TimeHelpActionTypes.Add:
      return action.payload;
    case TimeHelpActionTypes.Remove:
      return TimeData;
    default:
      return state;
  }
}
