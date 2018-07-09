import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ColibrisService } from "~/services/colibris.service";
import { Serie } from "~/modele/serie";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    listeSeries:Array<Serie>;

    constructor(public colServ:ColibrisService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.colServ.getSeries().subscribe(
            data => {
              console.log(data);
              this.listeSeries = <Array<Serie>>data;
              this.colServ.ecritFichierLocal(data);
            }
          );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
