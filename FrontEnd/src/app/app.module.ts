import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddContactsComponent } from './main/add-contacts/add-contacts.component';
import {EncrDecrService} from './encr-decr.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    AddContactsComponent
  ],
  imports: [
    PickerModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2TelInputModule,
    FormsModule,
    NgbModule, 
    Ng2SearchPipeModule
  ],
  providers: [ApiService,EncrDecrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
