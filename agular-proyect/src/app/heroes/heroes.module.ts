import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeroEffects, HeroReducer } from './store';
import { HeroesService } from './services/heroes.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
    declarations: [
        HeroPageComponent,
        LayoutPageComponent,
        ListPageComponent,
        NewPageComponent,
        SearchPageComponent,
        CardComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HeroesRoutingModule,
        MaterialModule,
        StoreModule.forFeature('heroes', HeroReducer),
        EffectsModule.forFeature([HeroEffects]), 
        HeroImagePipe,
    ],
    providers: [HeroesService],
})
export class HeroesModule { }