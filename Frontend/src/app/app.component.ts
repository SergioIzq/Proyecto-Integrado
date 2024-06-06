import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { GetUserDetails } from './shared/menu/ngrx/actions/menu.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    // Suscribirse a eventos de cambio de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(GetUserDetails())
      }
    });
  }

  // Método para verificar si la ruta actual es '/login'
  isLoginPage(): boolean {
    return this.router.url == 'login';
  }

  // Método para verificar si la ruta actual es '/registro'
  isRegistroPage(): boolean {
    return this.router.url == 'registro';
  }
}