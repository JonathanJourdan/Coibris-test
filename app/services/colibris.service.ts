import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { knownFolders, File, Folder } from "file-system";


@Injectable()
export class ColibrisService {

  adresse:string = "http://www.exlineo.com/dev/ns/colibris/";

  public folderName: string;
  public fileName: string;
  public fileTextContent: string;

  documents;
  file: File;
  folder: Folder;

  constructor(private http:HttpClient) { 

    this.documents = knownFolders.documents();
    this.folder = this.documents.getFolder('donnees' || "data");
    
  }

  

  getSeries(){
    console.log("connected");
    return this.http.get(this.adresse+'series.json');
  }

ecritFichierLocal(data, f="series.json") {
    this.file = this.folder.getFile(f);
    console.log("Fichier local", this.file, this.file.size);

    this.file.writeText(JSON.stringify(data) || "Data vide")
        .then(result => {
            this.file.readText()
                .then(res => {
                    console.log("Successfully saved in " + this.file.path);
                    console.log(res);
                });
        }).catch(err => {
            console.log(err);
        });
}

/**
 * Récupérer les données du fichier local
 * @param {string} src Fichier a lire pour récupérer des données
 */

litFichier(src="series.json"){
  return this.file.readText();
}

}