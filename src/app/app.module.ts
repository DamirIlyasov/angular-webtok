import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {PublisherComponent} from './component/publisher/publisher.component';
import {SubscriberComponent} from './component/subscriber/subscriber.component';
import {OpentokService} from './opentok.service';
import {StreamComponent} from './component/stream/stream.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [OpentokService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
