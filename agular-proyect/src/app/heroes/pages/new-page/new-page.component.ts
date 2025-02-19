import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { Publisher, Hero } from '../../interfaces/hero.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import * as HeroActions from './../../store/actions/hero.actions';
import * as HeroSelectors from './../../store/selectors/hero.selector';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  standalone: false,
  styles: []
})
export class NewPageComponent implements OnInit {

  private readonly store = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  public hero$ = signal(this.store.select(HeroSelectors.selectHero));
  public isLoading$ = signal(this.store.select(HeroSelectors.selectHeroLoading));

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(HeroActions.loadHero({ id }));
    });

    this.hero$().subscribe(hero => {
      if (!hero) return;

      this.heroForm.setValue({
        ...hero,
        alt_img: hero.alt_img ?? ''
      });
    });
  }


  /**
   * Method to handle form submission.
   * Dispatches actions to create or update a hero.
   */
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    const cleanedHero: Hero = this.heroForm.getRawValue() as Hero;

    Object.keys(cleanedHero).forEach((key) => {
      const property = key as keyof Hero; 
      if (typeof cleanedHero[property] === 'string' && property !== 'publisher') {
        cleanedHero[property] = (cleanedHero[property] as string).trim();
      }
    });


    if (cleanedHero.id) {
      this.store.dispatch(HeroActions.updateHero({ hero: cleanedHero }));
    } else {
      this.store.dispatch(HeroActions.createHeroSuccess({ hero: cleanedHero }));
    }
  }




  /**
   * Method to handle hero deletion.
   * Opens a confirmation dialog before dispatching the delete action.
   */
  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.store.dispatch(HeroActions.deleteHero({ id: this.currentHero.id! }));
      });
  }
}
