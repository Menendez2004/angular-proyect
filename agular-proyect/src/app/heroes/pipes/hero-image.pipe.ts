import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
  standalone: false
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {

    if (!hero || (!hero.id && !hero.alt_img)) {
      console.warn('No valid image for hero:', hero);
      return 'assets/no-image.png';
    }
    console.log('Image Path:', hero.alt_img ? hero.alt_img : `assets/heroes/${ hero.id }.jpg`);

    if (hero.alt_img?.trim()) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }


}
