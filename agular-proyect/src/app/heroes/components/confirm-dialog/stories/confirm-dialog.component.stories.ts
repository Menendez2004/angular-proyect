import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { Publisher } from '../../../interfaces/hero.interface';
import { action } from "@storybook/addon-actions";

export default {
    title: 'heroes/ConfirmDialog',
    component: ConfirmDialogComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                MatDialogModule,
                BrowserAnimationsModule,
                MatButtonModule
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: () => {}
                    }
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        superhero: 'Superman',
                        id: "super",
                        alter_ego: "test",
                        characters: "test",
                        first_appearance: "test",
                        publisher: Publisher.DCComics,
                        alt_img: ""
                    }
                }
            ],
        }),
    ],
    argTypes: {
        onNoClick: { action: "Cancel Clicked" },
        onConfirm: { action: "Confirm Clicked" }
    },
} as Meta<ConfirmDialogComponent>;

const Template: StoryFn<ConfirmDialogComponent> = (args: ConfirmDialogComponent) => ({
    component: ConfirmDialogComponent,
    template: `
        <h1 mat-dialog-title>¿Está seguro?</h1>
        <div mat-dialog-content>
            <p>Este proceso no es reversible, está a punto de elimiar a {{ data.superhero }}</p>
        </div>
        <div mat-dialog-actions>
            <button mat-button (click)="onNoClick()">No Thanks</button>
            <span class="spacer"></span>
            <button mat-button color="primary" (click)="onConfirm()" cdkFocusInitial>Ok</button>
        </div>
    `,
    props: {
        ...args,
        data: {
            superhero: 'Superman',
            id: "super",
            alter_ego: "test",
            characters: "test",
            first_appearance: "test",
            publisher: Publisher.DCComics,
            alt_img: ""
        },
        onNoClick: action("Cancel Clicked"), 
        onConfirm: action("Confirm Clicked"),
    }
});

export const Confirm = Template.bind({});

Confirm.args = {
    data: {
        superhero: 'Superman',
        id: "super",
        alter_ego: "test",
        characters: "test",
        first_appearance: "test",
        publisher: Publisher.DCComics,
        alt_img: ""
    }
};