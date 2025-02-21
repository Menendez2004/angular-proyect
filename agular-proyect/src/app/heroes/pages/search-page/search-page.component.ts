import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  standalone: false,
})
export class SearchPageComponent {

  public searchInput = new FormControl<string>('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {
    this.searchInput.valueChanges
      .subscribe(value => this.searchHero());
  }

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }


  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    console.log('Hero:', hero.id);

    const imgRelativePath = hero.id;
    hero.alt_img = `../src/assets/heroes/${imgRelativePath}.jpg`;
  

    this.selectedHero = hero;
    console.error('No ves que no renderiza ???',this.selectedHero.alt_img,);

  }




}
