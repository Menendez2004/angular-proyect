import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeroPageComponent } from '../hero-page.component';
import { HeroesService } from '../../../services/heroes.service';
import { HeroImagePipe } from '../../../pipes/hero-image.pipe';

export default {
    title: 'Pages/HeroPage',
    component: HeroPageComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                MatCardModule,
                MatListModule,
                MatButtonModule,
                MatProgressSpinnerModule,
                HeroImagePipe,
                MatGridListModule
            ],
            providers: [
                {
                    provide: HeroesService,
                    useValue: {
                        getHeroById: () =>
                            of({
                                id: "dc-test",
                                superhero: "test",
                                publisher: "DC Comics",
                                alter_ego: "testing",
                                first_appearance: "test",
                                characters: "testing",
                                alt_img: "https://spider-man.fandom.com/es/wiki/Peter_Parker_%28Tierra-616%29"
                            }),
                    },
                },
                { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
                { provide: Router, useValue: { navigateByUrl: () => { } } },
            ],
        }),
    ],
} as Meta<HeroPageComponent>;

const Template: StoryFn<HeroPageComponent> = (args: any) => ({
    props: {
        ...args,
        hero: {
            id: "dc-test",
            superhero: "test",
            publisher: "DC Comics",
            alter_ego: "testing",
            first_appearance: "test",
            characters: "testing",
            alt_img: "https://spider-man.fandom.com/es/wiki/Peter_Parker_%28Tierra-616%29"
        },
        goBack: () => console.log('Going back...')
    },
    template: `
    <ng-template #divLoading>
      <mat-grid-list cols="1">
        <mat-grid-tile>
          <mat-spinner></mat-spinner>
        </mat-grid-tile>
      </mat-grid-list>
    </ng-template>

    <div *ngIf="hero; else divLoading" class="grid p-2">
      <mat-card class="col-12 sm:col-6">
        <mat-card-header>
          <mat-card-title>{{ hero.alter_ego }}</mat-card-title>
          <mat-card-subtitle>{{ hero.superhero }}</mat-card-subtitle>
        </mat-card-header>

        <img [src]="hero | heroImage" [alt]="hero.superhero" mat-card-image />
      </mat-card>

      <mat-card class="col-12 sm:col-6">
        <mat-card-header>
          <mat-card-title>Información</mat-card-title>
          <mat-card-subtitle>{{ hero.superhero }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <mat-list>
            <mat-list-item>{{ hero.first_appearance }}</mat-list-item>
            <mat-list-item>{{ hero.characters }}</mat-list-item>
            <mat-list-item>{{ hero.publisher }}</mat-list-item>
            <mat-list-item>{{ hero.alter_ego }}</mat-list-item>
          </mat-list>

          <button mat-button color="warn" (click)="goBack()">Regresar</button>
        </mat-card-content>
      </mat-card>
    </div>
    `
});

export const HeroPage = Template.bind({});