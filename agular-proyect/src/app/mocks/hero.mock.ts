import { Hero, Publisher } from "../heroes/interfaces/hero.interface";

export const sampleHeroes: { [key: string]: Hero } = {
    superman: {
        id: 'dc-superman',
        superhero: 'Superman',
        publisher: Publisher.DCComics,
        alter_ego: 'Clark Kent',
        first_appearance: 'Action Comics #1',
        characters: 'Kal-El',
    },
    batman: {
        id: 'dc-batman',
        superhero: 'Batman',
        publisher: Publisher.DCComics,
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
        characters: 'Bruce Wayne'
    },
    ironman: {
        id: 'marvel-iron',
        superhero: 'Iron Man',
        publisher: Publisher.MarvelComics,
        alter_ego: 'Tony Stark',
        first_appearance: 'Tales of Suspense #39',
        characters: 'Tony Stark'
    }
};
