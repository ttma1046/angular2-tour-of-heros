import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component(
    {
        selector: 'my-heroes',
        templateUrl: 'app/heroes.component.html',
        styleUrls: ['app/heroes.component.css']
    })

export class HeroesComponent implements OnInit {
    title = 'Heroes List';
    selectedHero: Hero;

    heroes: Hero[];

    ngOnInit(): void {
        this.getHeroes();
    }

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    getHeroes(): void {
        this.heroService.getHeroesSlowly().then(heros => this.heroes = heros);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}












