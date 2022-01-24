import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageDataService } from './services/local-storage-data.service';
import { StaticDataService } from './services/static-data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    LocalStorageDataService,
    StaticDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
