import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { MatDividerModule } from '@angular/material/divider';
import { ListPageComponent } from '../list-page.component';
import { of } from 'rxjs';
import { Publisher } from '../../../interfaces/hero.interface';
import { CardComponent } from '../../../components/card/card.component';
import { HeroesService } from '../../../services/heroes.service';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { HeroImagePipe } from '../../../pipes/hero-image.pipe';
import {action} from '@storybook/addon-actions';
// Mock heroes data
const mockHeroes = [
    {
        id: "dc-batman",
        superhero: "Batman",
        publisher: Publisher.DCComics,
        alter_ego: "Bruce Wayne",
        first_appearance: "Detective Comics #27",
        characters: "Bruce Wayne",
        alt_img: ""
    },
    {
        id: "dc-superman",
        superhero: "Superman",
        publisher: Publisher.DCComics,
        alter_ego: "Kal-El",
        first_appearance: "Action Comics #1",
        characters: "Kal-El",
        alt_img: ""
    },
    {
        id: "marvel-spider",
        superhero: "Spider Man",
        publisher: Publisher.MarvelComics,
        alter_ego: "Peter Parker",
        first_appearance: "Amazing Fantasy #15",
        characters: "Peter Parker",
        alt_img: ""
    }
];

// Mock HeroesService
const mockHeroesService = {
    getHeroes: () => of(mockHeroes)
};

export default {
    title: 'pages/ListPage',
    component: ListPageComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            declarations: [
                CardComponent 
            ],
            imports: [
                MatDividerModule,
                MatCardModule,
                HeroImagePipe,
                MatCardActions
                
            ],
            providers: [
                { provide: HeroesService, useValue: mockHeroesService }
            ],
        }),
    ],
    argTypes: {
        onHeroClick: { action: "Hero Clicked" },  
        onEditHero: { action: "Edit Hero Clicked" }, 
    }

} as Meta<ListPageComponent>;

const Template: StoryFn = (args) => ({
    component: ListPageComponent,
    template: `
    <h1>Listado de Héroes</h1>
    <mat-divider></mat-divider>

    <div class="grid bm-8 pt-2">
        <div *ngFor="let hero of heroes"
            class="col-12 sm:col-4 md:col-3 xl:col-2">
            <heroes-hero-card 
                [hero]="hero" 
                (click)="onEditHero(hero)">
            </heroes-hero-card>
        </div>
    </div>
    `,
    props: {
        ...args,
        heroes: mockHeroes,
        onEditHero: action("Hero Card Clicked", { depth: 1 }),
    },
});


export const primary = Template.bind({});


export const ManyHeroes = Template.bind({});
ManyHeroes.args = {
    heroes: Array(12).fill(null).map((_, index) => ({
        ...mockHeroes[index % 3],
        id: `hero-${index}`,
        superhero: `Hero ${index + 1}`
    }))
};