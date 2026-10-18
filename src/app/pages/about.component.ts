import { Component, inject, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'about',
    template:`
    <h1 class="text-3xl" > Sobre la aplicación</h1>
    <hr>
    <section>
        <p>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reprehenderit iste quaerat accusamus, assumenda sint dicta dignissimos? Nisi hic omnis aliquid, praesentium odit ratione ipsa numquam iste! Autem, cupiditate hic!
        </p>
    </section>
    `
})
export default class About implements OnInit {

    private title = inject(Title)
    private meta = inject(Meta)

    ngOnInit(): void {
    
        this.title.setTitle('About page')
        this.meta.updateTag({name: 'description', content: 'Este es mi about page'})
        this.meta.updateTag({name: 'og:title', content: 'Este es mi about page'})
    }
}