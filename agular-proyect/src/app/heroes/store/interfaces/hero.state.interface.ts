import { Hero } from "../../interfaces/hero.interface";
export interface HeroState {
    hero: Hero | null;
    loading: boolean;
    error: any;
}