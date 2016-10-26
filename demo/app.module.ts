import { NgModule } from '@angular/core';
import { NgFileUploadModule } from '../lib/ng2-uploader';
import { AppComponent }   from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    NgFileUploadModule,
    BrowserModule
  ],
  exports: [],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
