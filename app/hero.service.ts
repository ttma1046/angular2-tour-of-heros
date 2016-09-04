import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes'; //URL to web api.

    constructor(private http: Http) {

    }

    getHeroes() : Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(reslove => 
        setTimeout(reslove, 2000))
        .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                .put(url, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        const url = `${this.heroesUrl}/`;

        var hero: Hero = {
            id : null,
            name : name
        };

        return this.http
                .post(url, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
}
   


}