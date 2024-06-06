import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from '../services/auth.service';
import { LoginEffects } from './login/ngrx/effects/login.effects';
import { RegistroEffects } from './registro/ngrx/effects/registro.effects';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';



const AUTH_COMPONENTS = [
    LoginComponent,
    RegistroComponent
];

const AUTH_EFFECTS = [
    LoginEffects,
    RegistroEffects    
];

const AUTH_PROVIDERS = [
    AuthService,
];

@NgModule({
    declarations: [
        ...AUTH_COMPONENTS,
    ],
    imports: [
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        CommonModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        MessageModule,
        PasswordModule,
        AuthRoutingModule,
        FormsModule,
        InputMaskModule,
        ReactiveFormsModule,
        SelectButtonModule,
        EffectsModule.forFeature(AUTH_EFFECTS),
    ],
    providers: [
        ...AUTH_PROVIDERS
    ],
    exports: [
        CommonModule,
        ...AUTH_COMPONENTS,
    ]
})
export class AuthModule { }
