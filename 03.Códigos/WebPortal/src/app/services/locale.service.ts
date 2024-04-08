import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class LocalService{

    static locale: string
    locale = this.getLocale();
    language: string

    constructor(private translate: TranslateService){
        this.language = this.translate.getDefaultLang()
    }

    getLocale(): string{
        return 'pt';
    }
}