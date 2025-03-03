import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
  standalone: true
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {

    if (!hero || (!hero.id && !hero.alt_img)) {
      return 'assets/no-image.png';
    }

    if (hero.alt_img?.trim()) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }


}
