import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroImagePipe } from "../../../pipes/hero-image.pipe";
import { Hero } from "../../../interfaces/hero.interface";
import { sampleHeroes } from "../../../../mocks/hero.mock";

@Component({
    selector: 'heroes-hero-card-mock',
    templateUrl: './card.component.story.html',
    standalone: true,
    imports: [ 
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDividerModule,
        RouterModule,
        HeroImagePipe
    ],
})
class MockCardComponent {
    @Input() hero!: Hero;
}

export default {
    title: 'Heroes/Card',
    component: MockCardComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                MatCardModule,
                MatButtonModule,
                MatChipsModule,
                MatIconModule,
                MatDividerModule,
                RouterModule,
                HeroImagePipe
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({ get: () => 'dc-superman' }),
                        snapshot: { paramMap: { get: () => 'dc-superman' } }
                    }
                }
            ]
        }),
    ],
    argTypes: {
        hero: {
            control: 'object',
            description: 'Hero data object to be displayed in the card'
        }
    }
} as Meta<MockCardComponent>;

type Story = StoryObj<MockCardComponent>;

export const cardComponent: Story = {
    args: {
        hero: {
            ...sampleHeroes['superman'],
            alt_img: 'https://www.latercera.com/resizer/v2/2TN7SNTMBZHW5BFIKO4DLYOLPU.jpg?quality=80&smart=true&auth=d1c3576a185182375d068a903381469e4eed74ca8fc1e62829dcfd151a69e068&width=290&height=380'
        },
    },

};

export const DCHero: Story = {
    args: {
        hero: {
            ...sampleHeroes['batman'],
            alt_img: 'https://www.partyrama.co.uk/wp-content/uploads/2023/03/batman-comic-book-style-dc-comics-small-star-mini-cutout-92cm-product-image.jpg%20.jpg'
        }
    },
};
