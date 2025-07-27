//##############################\ANGULAR MODULES\######################################################################
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//##############################\RESOURCES PLANNER APPLICATION\########################################################
//Application
import { AppInitModule } from '@app/app-init.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { environment } from '@environments/environment';
//Directives
import { ComponentFactoryDirective } from '@app/common/directives';


//#####################################################################################################################

//ANGULAR MATERIAL
// const MaterialModules = [

// ];


@NgModule({
  declarations: [
    // AppComponent,
  ],
  imports: [
    AppInitModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    //...MaterialModules,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},

  ],
  bootstrap: [
    // AppComponent
  ]
})
export class AppModule { }
