import { Component, OnInit } from '@angular/core';
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
  

  
  constructor(
    private store: Store, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { const loadHero$ = this.store.select(HeroSelectors.selectHeroLoading)}

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }
    /**
     * Lifecycle hook to initialize the component.
     * Checks if the URL contains 'edit' to load the hero details.
     */
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(HeroActions.loadHeroes({ id }));
    });

    this.store.select(HeroSelectors.selectHero).subscribe(hero => {
      if (!hero) return;
      this.heroForm.reset(hero);
    });
  }

  /**
   * Method to handle form submission.
   * Dispatches actions to create or update a hero.
   */

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.store.dispatch(HeroActions.updateHero({ hero: this.currentHero }));
      return;
    }

    this.store.dispatch(HeroActions.createHero({ hero: this.currentHero }));
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
      .pipe(
        filter((result: boolean) => result)
      )
      .subscribe(() => {
        this.store.dispatch(HeroActions.deleteHero({ id: this.currentHero.id! }));
      });
  }
}