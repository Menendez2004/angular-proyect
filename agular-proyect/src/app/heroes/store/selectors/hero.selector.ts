import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from '../interfaces/hero.state.interface';

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

export const selectHero = createSelector(
    selectHeroState,
    (state) => state.hero
);

export const selectHeroLoading = createSelector(
    selectHeroState,
    (state) => state.loading
);

export const selectHeroError = createSelector(
    selectHeroState,
    (state) => state.error
);