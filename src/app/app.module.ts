import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnergyPageComponent } from './energy-page/energy-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsageComponent } from './usage/usage.component';
import { FormsModule } from '@angular/forms';
import { ConsumptionCardComponent } from './consumption-card/consumption-card.component';
import { LoginComponent } from './login/login.component';
import { UsageComparisonComponent } from './usage-comparison/usage-comparison.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SmartConfigComponent } from './smart-config/smart-config.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { EmailWarningComponent } from './email-warning/email-warning.component';

@NgModule({
  declarations: [
    AppComponent,
    EnergyPageComponent,
    HeaderComponent,
    FooterComponent,
    UsageComponent,
    ConsumptionCardComponent,
    LoginComponent,
    UsageComparisonComponent,
    LeaderboardComponent,
    SmartConfigComponent,
    MonthlyReportComponent,
    EmailWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
