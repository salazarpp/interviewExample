import * as moment from 'moment';

export interface TimeT {
    TimeHelp: string;
}

export class TimeData {
    TimeHelp = moment().format('YYYY-MM-DD');
}

export const TimeInitialData = {
    TimeHelp: moment().format('YYYY-MM-DD'),
};
