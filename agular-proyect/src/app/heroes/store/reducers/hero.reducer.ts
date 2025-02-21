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

    // Load hero
    on(HeroActions.loadHero, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HeroActions.loadHeroSuccess, (state, { hero }) => ({
        ...state,
        hero,
        loading: false
    })),
    on(HeroActions.loadHeroFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Create hero
    on(HeroActions.createHero, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HeroActions.createHeroSuccess, (state, { hero }) => ({
        ...state,
        hero,
        loading: false
    })),
    on(HeroActions.createHeroFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Update hero
    on(HeroActions.updateHero, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
        ...state,
        hero,
        loading: false
    })),
    on(HeroActions.updateHeroFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Delete hero
    on(HeroActions.deleteHero, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HeroActions.deleteHeroSuccess, state => ({
        ...state,
        hero: null,
        loading: false
    })),
    on(HeroActions.deleteHeroFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
