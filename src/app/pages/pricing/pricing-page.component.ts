import { isPlatformServer } from "@angular/common";
import { Component, inject, PLATFORM_ID } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'pricing-page',
      template:`<h1 class="text-3xl" > Precios de la app</h1>
    
    <section>
        <p>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reprehenderit iste quaerat accusamus, assumenda sint dicta dignissimos? Nisi hic omnis aliquid, praesentium odit ratione ipsa numquam iste! Autem, cupiditate hic!
        </p>
    </section>
    `
})
export default class PricingPage {
    
    private title = inject(Title)
    private meta = inject(Meta)
    private platform = inject(PLATFORM_ID)

    ngOnInit(): void {

        this.title.setTitle('Piricing page')

        // if(!isPlatformServer(this.platform)) {
        //     document.title = 'Pricing page'
        // }

        this.meta.updateTag({name: 'description', content: 'Este es mi pricing page'})
        this.meta.updateTag({name: 'og:title', content: 'Este es mi about page'})
    }

}