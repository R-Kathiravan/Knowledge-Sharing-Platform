import { Injectable, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { getAuthConfig } from '../auth-config';

import { UserService } from './user.service';

@Injectable({

  providedIn: 'root',
})

export class AuthGoogleService {



  private oAuthService = inject(OAuthService);

  private router = inject(Router);

  private userService = inject(UserService);

  profile = signal<any>(null);

  constructor() {

    this.initConfiguration();

  }

  initConfiguration() {

    this.oAuthService.configure(getAuthConfig());

    this.oAuthService.setupAutomaticSilentRefresh();

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {

      if (this.oAuthService.hasValidIdToken()) {

        const claims = this.oAuthService.getIdentityClaims();

        this.profile.set(claims);

        const role = claims && claims['role'] ? claims['role'] : 'faculty';

        this.userService.setRole(role);

      }

    });

  }

  login() {

    this.oAuthService.initImplicitFlow();

  }

  logout() {

    this.oAuthService.revokeTokenAndLogout();

    this.oAuthService.logOut();

    this.profile.set(null);

    this.userService.clearRole();

  }

  getProfile() {

    return this.profile();

  } }
