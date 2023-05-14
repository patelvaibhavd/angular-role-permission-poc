import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, AuthService, JwtService, StorageService, UtilsService } from './services';
import { StoriesService } from './services/stories.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService,
    StorageService,
    UtilsService,
    JwtService,
    StoriesService
  ]
})
export class CoreModule { }
