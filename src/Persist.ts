import { ncp } from "ncp";

class Persist {
    public templates() {
        ncp('./templates', './dist/templates', function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('Arquivos de modelo copiados com sucesso!');
          });
    }
}

const persist = new Persist();

persist.templates();