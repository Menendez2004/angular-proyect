import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import * as HeroActions from '../actions/hero.actions';
import { RedirectCommand, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HeroEffects {
    private readonly actions$ = inject(Actions);
    private readonly heroesService = inject(HeroesService);
    private readonly router = inject(Router);
    private readonly snackbar = inject(MatSnackBar);

    loadHero = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.loadHero),
            mergeMap(({ id }) =>
                this.heroesService.getHeroById(id).pipe(
                    map(hero =>
                        hero
                            ? HeroActions.loadHeroSuccess({ hero })
                            : HeroActions.loadHeroFailure({ error: 'Hero not found' })
                    ),
                    catchError(error => of(HeroActions.loadHeroFailure({ error })))
                )
            )
        )
    );

    createHero = createEffect(() =>
        this.actions$.pipe(
            ofType(HeroActions.createHero),
            mergeMap(({ hero }) =>
                this.heroesService.addHero(hero).pipe(
                    map(createdHero => HeroActions.createHeroSuccess({ hero: createdHero })),
                    catchError(error => of(HeroActions.createHeroFailure({ error })))
                )
            )
        )
    );

    createHeroSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.createHeroSuccess),
                tap(({ hero }) => {
                    this.showSnackbar(`${hero.superhero} created!`);
                })
            ),
        { dispatch: false }
    );

    updateHero = createEffect(() =>
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

    updateHeroSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.updateHeroSuccess),
                tap(({ hero }) => {
                    this.showSnackbar(`${hero.superhero} updated!`);
                })
            ),
        { dispatch: false }
    );

    deleteHero = createEffect(() =>
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

    deleteHeroSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(HeroActions.deleteHeroSuccess),
                tap(() => {
                    this.router.navigate(['/heroes']);
                })
            ),
        { dispatch: false }
    );

    private showSnackbar(message: string): void {
        this.snackbar.open(message, 'Done', { duration: 2500 });
        this.router.navigate(['/heroes']);
    }


}
