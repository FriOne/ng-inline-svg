import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
export declare class InlineSVGConfig {
    baseUrl: string;
}
export declare class SVGCacheService {
    private _http;
    private static _cache;
    private static _inProgressReqs;
    private static _baseUrl;
    constructor(config: InlineSVGConfig, _http: HttpClient);
    getSVG(url: string, cache?: boolean): Observable<SVGElement>;
    setBaseUrl(config: InlineSVGConfig): void;
    private _getAbsoluteUrl(url);
    private _svgElementFromString(str);
    private _cloneSVG(svg);
}
