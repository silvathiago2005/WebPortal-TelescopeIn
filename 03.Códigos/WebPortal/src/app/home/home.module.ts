import { NgModule } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { defaultLanguage } from "./home.constants";

@NgModule({
    imports: [TranslateModule]
})

export class HomeModule {
    constructor(translateService: TranslateService){

        translateService.setDefaultLang(defaultLanguage);
        translateService.use(defaultLanguage);
    }
}