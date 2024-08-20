import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions(), withComponentInputBinding()),importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"fir-50674","appId":"1:129867985029:web:b1adf4c63fcffca16f39ec","storageBucket":"fir-50674.appspot.com","apiKey":"AIzaSyDaRJ5gjnzW2NmGmM3pNPgjKdjATDvo7mM","authDomain":"fir-50674.firebaseapp.com","messagingSenderId":"129867985029"}))), importProvidersFrom(provideFirestore(() => getFirestore())), ]
};
