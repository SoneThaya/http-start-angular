import { AuthInterceptorService } from "./auth-intercepter.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// NEED HttpClientModule TO MAKE API REQUEST
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  // DON'T FORGET TO IMPORT IT HERE
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
