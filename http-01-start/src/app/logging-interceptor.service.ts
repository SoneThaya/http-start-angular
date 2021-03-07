import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEventType,
} from "@angular/common/http";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Outgoing request");
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("incoming response");
          console.log(event.body);
        }
      })
    );
  }
}
