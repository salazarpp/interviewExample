import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TimeData } from '../../interfaces/time-t';

export const selectFeature = createFeatureSelector<TimeData>('TimeHelp');
export const countSelector = createSelector(selectFeature, (state) => state);
