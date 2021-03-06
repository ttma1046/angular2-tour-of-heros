import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';

import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    hero: Hero;

    save(): void {
        this.heroService.update(this.hero).then(this.goBack);
    }

    ngOnInit():  void {
        this.route.params.forEach((params: Params) => {
           let id = +params['id'];
           this.heroService.getHero(id).then(hero => this.hero = hero); 
        });
    }

    goBack(): void {
        window.history.back();
    }

    deleteRequest = new EventEmitter<Hero>();

    delete() {
        this.deleteRequest.emit(this.hero);
    }

    constructor(private heroService: HeroService, private route: ActivatedRoute    
    ) {

    }
}