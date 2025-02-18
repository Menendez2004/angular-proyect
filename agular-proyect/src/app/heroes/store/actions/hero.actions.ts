import { createAction, props } from "@ngrx/store";
import { Hero } from "../../interfaces/hero.interface";

export const loadHeroes = createAction(
    '[Hero] Load Heroes',
    props<{ id: string }>()
);
export const loadHeroesSuccess = createAction(
    '[Hero] Load Heroes Success',
    props<{ heroes: Hero[] }>()
);
export const loadHeroesError = createAction(
    '[Hero] Load Heroes Error',
    props<{ error: any }>()
);

export const createHero = createAction(
    '[Hero] Create Hero',
    props<{ hero: Hero }>()
);
export const createHeroFailure = createAction(
    '[Hero] Create Hero Failure',
    props<{ error: any }>()
);

export const updateHero = createAction(
    '[Hero] Update Hero',
    props<{ hero: Hero }>()
);
export const updateHeroSuccess = createAction(
    '[Hero] Update Hero Success',
    props<{ hero: Hero }>()
);
export const updateHeroFailure = createAction(
    '[Hero] Update Hero Failure',
    props<{ error: any }>()
);

export const deleteHero = createAction(
    '[Hero] Delete Hero',
    props<{ id: string }>()
);
export const deleteHeroSuccess = createAction(
    '[Hero] Delete Hero Success',
    props<{ id: string }>()
);
export const deleteHeroFailure = createAction(
    '[Hero] Delete Hero Failure',
    props<{ error: any }>()
);
