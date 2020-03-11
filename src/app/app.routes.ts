import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { SignupComponent } from './signup/signup.component'

export const appRoutes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'landing',
        component: LandingpageComponent
    },
    {
        path:'map',
        component: MapComponent
    },
    {
        path:'signup',
        component: SignupComponent
    }
]
