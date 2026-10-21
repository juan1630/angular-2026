import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar.component';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <a href="link"> Test link </a>
    </nav>
  `,
})
export class MockNavbar {}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    //opcion 1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])]
    // })
    //   .compileComponents();

    // opcion 2
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .overrideComponent(App, {
        add: {
          imports: [MockNavbar],
        },
        remove: {
          imports: [Navbar],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compíled = fixture.nativeElement as HTMLElement;

    expect(compíled.querySelector('navbar')).toBeTruthy();
    expect(compíled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compíled = fixture.nativeElement as HTMLElement;
    expect(compíled).toMatchSnapshot();
  });
});
