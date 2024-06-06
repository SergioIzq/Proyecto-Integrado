import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from '../login/ngrx/actions/login.actions';
import { selectMostrarModalError } from './ngrx/selectors/login.selectors';
import { AppState } from 'src/app/app.state';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  correo!: string;
  contrasena!: string;
  errorMessage!: string;
  showErrorModal: boolean = false; // Variable booleana para controlar la visibilidad del modal de error
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    // Suscribirse al observable y actualizar la variable showErrorModal
    this.store.select(selectMostrarModalError).pipe(takeUntil(this.destroy$)).subscribe((showModal: boolean) => {
      this.showErrorModal = showModal;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loginPaciente(): void {
    this.store.dispatch(LoginActions.LoginPaciente({ correo: this.correo, contrasena: this.contrasena }));
  }

  loginMedico(): void {
    this.store.dispatch(LoginActions.LoginMedico({ correo: this.correo, contrasena: this.contrasena }));
  }

  closeModal(): void {
    // Emitir una acción para cerrar el modal de error
    this.store.dispatch(LoginActions.CloseErrorModal());
  }
}
