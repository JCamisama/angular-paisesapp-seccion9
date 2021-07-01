import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country; //"Ok TypeScript, yo sé lo que estoy haciendo, país puede ser nulo"

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _paisService: PaisService
    ) { }

  ngOnInit(): void {

    this._activatedRoute.params
      .pipe(
        switchMap( ( param ) => this._paisService.getPaisPorAlpha(param.id)),
        tap( console.log ) //tap dispara un efecto secundario
      )
      .subscribe( pais => this.pais = pais);



    /******** Primera solución presentada *********/
    // this._activatedRoute.params
    //   .subscribe(  ({ id }) => {
    //     console.log(id);

    //     this._paisService.getPaisPorAlpha( id )
    //       .subscribe( pais => {
    //         console.log(pais);
    //       });
    //   });
  }

}
