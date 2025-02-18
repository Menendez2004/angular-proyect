import { createReducer, on } from "@ngrx/store";
import * as HeroActions from '../actions/hero.actions';
import { HeroState } from "../interfaces/hero.state.interface";

export const initialState: HeroState = {
    hero: null,
    loading: false,
    error: null
};

export const HeroReducer = createReducer(
    initialState,
    on(HeroActions.loadHeroes, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(HeroActions.loadHeroesSuccess, (state, { heroes }) => ({
        ...state,
        heroes,
        loading: false
    })),

    on(HeroActions.updateHeroFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),


    on(HeroActions.createHero, state => ({
        ...state,
        loading: true
    })),

    on(HeroActions.createHero, (state, { hero }) => ({
        ...state,
        hero,
        loading: false
    })),

    on(HeroActions.updateHero, state => ({
        ...state,
        loading: true
    })),

    on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
        ...state,
        hero,
        loading: false
    })),

    on(HeroActions.deleteHero, state => ({
        ...state,
        loading: true
    })),

    on(HeroActions.deleteHeroSuccess, state => ({
        ...state,
        hero: null,
        loading: false
    }))
);