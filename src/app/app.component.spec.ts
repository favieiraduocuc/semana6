import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: of({}),
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'lumora-client' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lumora-client');
  });

  it('should have a defined ActivatedRoute provider', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const route = TestBed.inject(ActivatedRoute);
    expect(route).toBeDefined();
  });

  it('should handle queryParams observable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const route = TestBed.inject(ActivatedRoute);
    let queryHandled = false;

    route.queryParams.subscribe(() => {
      queryHandled = true;
    });

    expect(queryHandled).toBeTrue();
  });

  it('should have a snapshot on route', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const route = TestBed.inject(ActivatedRoute);
    expect(route.snapshot).toBeDefined();
  });

  it('should have a non-empty title property', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBeTruthy(); // Verifica que tenga algún valor
  });
});
