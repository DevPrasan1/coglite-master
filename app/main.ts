import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { XHRBackend, RequestOptions } from '@angular/http';


platformBrowserDynamic().bootstrapModule(
    AppModule
);
