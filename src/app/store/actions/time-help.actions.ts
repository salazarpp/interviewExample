import {Action} from '@ngrx/store';
export enum TimeHelpActionTypes {
  Add = '[TimeHelp Component] Add',
  Remove = '[TimeHelp Component] Remove'
}
export class ActionEx implements Action {
  readonly type: any;
  payload: any;
}
export class TimeHelpAdd implements ActionEx {
  readonly type = TimeHelpActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class TimeHelpRemove implements ActionEx {
  readonly type = TimeHelpActionTypes.Remove;
  constructor(public payload: any) {
  }
}
