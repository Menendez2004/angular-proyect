import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutPageComponent } from '../layout-page.component';
import { User } from '../../../../auth/interfaces/user.interface';
import { AuthService } from '../../../../auth/services/auth.service';

// Mock AuthService
const mockAuthService = {
    currentUser: {
        id: 1,
        user: "test",
        email: 'test@example.com',
    } as User,
    logout: () => console.log('Logout clicked')
};

export default {
    title: 'pages/LayoutPage',
    component: LayoutPageComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                BrowserAnimationsModule,
                RouterModule,
                MatToolbarModule,
                MatSidenavModule,
                MatListModule,
                MatIconModule,
                MatButtonModule
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService }
            ],
        }),
    ],
} as Meta<LayoutPageComponent>;

const Template: StoryFn = (args) => ({
    component: LayoutPageComponent,
    template: `
    <mat-sidenav-container class="full-height">
        <mat-sidenav #sidenav mode="push" [ngStyle]="{ width: '150px'  }">
            <mat-toolbar>
                <span>Menú</span>
                <span class="spacer"></span>
                <button mat-icon-button (click)="sidenav.toggle()">|||
                </button>
            </mat-toolbar>

            <mat-nav-list>
                <mat-list-item
                    *ngFor="let item of sidebarItems"
                    [routerLink]="item.url"
                    (click)="sidenav.toggle()"
                >
                    {{ item.label }}
                </mat-list-item>
            </mat-nav-list>
        </mat-sidenav>

        <mat-toolbar color="primary">
            <button mat-icon-button (click)="sidenav.toggle()">|||
            </button>

            <span class="spacer"></span>

            <span>{{ user?.email }}</span>

            <button mat-button (click)="onLogout()">
                Logout
            </button>
        </mat-toolbar>

        <div class="container p-2">
            <router-outlet></router-outlet>
        </div>
    </mat-sidenav-container>
    `,
    props: {
        ...args,
        sidebarItems: [
            { label: 'Listado', icon: 'label', url: './list' },
            { label: 'Añadir', icon: 'add', url: './new-hero' },
            { label: 'Buscar', icon: 'search', url: './search' },
        ],
        user: mockAuthService.currentUser,
        onLogout: () => {
            console.log('Logout clicked');
        }
    },
    styles: [
    ]
});

export const Loged = Template.bind({});

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    user: undefined
};