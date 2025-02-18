import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import * as HeroActions from '../actions/hero.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HeroEffects {
    loadHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.loadHeroes),
            mergeMap(({ id }) =>
                this.heroesService.getHeroById(id).pipe(
                    map(hero =>
                        hero
                            ? HeroActions.loadHeroesSuccess({ heroes: [hero] })
                            : HeroActions.loadHeroesError({ error: 'Hero not found' })
                    ),
                    catchError(error => of(HeroActions.loadHeroesError({ error })))
                )
            )
        )
    );

    createHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.createHero),
            mergeMap(({ hero }) =>
                this.heroesService.addHero(hero).pipe(
                    map(createdHero => HeroActions.createHero({ hero: createdHero })), // Fixed action name
                    catchError(error => of(HeroActions.createHeroFailure({ error })))
                )
            )
        )
    );

    createHeroSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.createHero), // Changed to listen for success action
                tap(({ hero }) => {
                    this.router.navigate(['/heroes/edit', hero.id]);
                    this.showSnackbar(`${hero.superhero} created!`);
                })
            ),
        { dispatch: false }
    );

    updateHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.updateHero),
            mergeMap(({ hero }) =>
                this.heroesService.updateHero(hero).pipe(
                    map(updatedHero => HeroActions.updateHeroSuccess({ hero: updatedHero })),
                    catchError(error => of(HeroActions.updateHeroFailure({ error })))
                )
            )
        )
    );

    updateHeroSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.updateHeroSuccess),
                tap(({ hero }) => {
                    this.showSnackbar(`${hero.superhero} updated!`);
                })
            ),
        { dispatch: false }
    );

    deleteHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.deleteHero),
            mergeMap(({ id }) =>
                this.heroesService.deleteHeroById(id).pipe(
                    map(() => HeroActions.deleteHeroSuccess({ id })),
                    catchError(error => of(HeroActions.deleteHeroFailure({ error })))
                )
            )
        )
    );

    deleteHeroSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.deleteHeroSuccess),
                tap(() => {
                    this.router.navigate(['/heroes']);
                })
            ),
        { dispatch: false }
    );

    constructor(
        private readonly actions$: Actions,
        private readonly heroesService: HeroesService,
        private readonly router: Router,
        private readonly snackbar: MatSnackBar
    ) {}

    private showSnackbar(message: string): void {
        this.snackbar.open(message, 'done', {
            duration: 2500,
        });
    }
}