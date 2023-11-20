//nadefinujeme si novou prazdnou kolekci
let insurances = new Map();
    
//funkce pro ulozeni pojisteni
function addInsurance(){
    //vytahame hodnoty zadane do inputu
    const name = document.getElementById("jmeno").value;
    const address = document.getElementById("adresa").value;
    const town = document.getElementById("mesto").value;
    const age = document.getElementById("vek").value;
    const contact = document.getElementById("kontakt").value;
    const product = document.getElementById("pojistka").value;

    
    //zjistime pocet radku v kolekci a pricteme 1
    //bude slouzit k rozliseni radku s pojistencem se shodou jmena s jinym pojistencem
    const rowCounter = insurances.size + 1;
    
    //slepíme jméno a vytvorene id do retezce
    //tim se za jmeno prida cislo, ktere jsme vytvorili v rowCounter a vznikne unikatni ID radku
    const rowId = name + rowCounter;
    
    //slepime zadane udaje ve formulari do html kodu radku tabulky
    //element <tr> ma ID, ktere jsme vytvorili do rowId, aby se nechal podle tohoto ID mazat
    //kvuli mazani jsme pridali na konec href s textem X, ktery po kliknuti smaze zaznam z kolekce
    
    const tableRow = '<tr id="' + rowId + '"><td>' + name + '</td><td>' + address + '</td><td>'+ town + '</td><td>' + age + '</td><td>' + contact + '</td><td>' + product + '</td><td><a href="javascript:void(+1 overload)" id="delete-' + rowId + '">X</a></td></tr>';
    
    // pridame radek do kolekce - jako key je rowId, jako value je rovnou html kod radku tabulky tableRow
    //jmeno je v key proto, abys to mohl seradit podle jmen jednoduseji
    insurances.set(rowId, tableRow);

    //spustime funkci na prenacteni obsahu tabulky
    fillTable();
    
}

  
//funkce pro smazani pojisteni, key je predany parametr z volani funkce
     function deleteInsurance(key){
    //zeptame se uzivatele, jestli to chce vazne smazat
    let allowDeletion = confirm("Opravdu smazat řádek?");
    
    //pokud klikne uzivatel na OK, smazeme
    if(allowDeletion === true){
        //smazeme radek z kolekce s danym klicem
        insurances.delete(key);
    
        //znovu vypiseme tabulku
        fillTable();
    }
}

//funkce pro vypsani tabulky
function fillTable(){
    //smazeme obsah html v <tablebody>
    document.getElementById('tableBody').innerHTML = '';
    
    //iterujeme kolekci 
         insurances.forEach((value, key) => {
        //pro kazdy prvek v kolekci pridame v ni ulozeny html kod radku tabulky na konec <tableBody>
        document.getElementById('tableBody').insertAdjacentHTML('beforeend', value);
        
        //jelikoz se ale z kolekce cely radek tabulky vypisuje jako holy text a my potrebujeme, 
        //aby bylo to X klikaci, tak musime pridat event listener ke kazdemu X
        
        //najdeme vytvoreny element podle ID, ktere jsme vyrobili v ukladani html kodu radku
        //tedy retezec "delete-" a hned za nim rowId, kterym jsme si zajistili unikatnost radku
        // const toggleMenuButton = document.querySelector('#delete-' + key);
        
        //pridame event listener click
       // toggleMenuButton.addEventListener('click', function() {//
            
            //nadefinujeme funkci, co ma udelat po kliknuti, v tomto pripade smaze zaznam s danym unikatnim ID
          //deleteInsurance(key); //
        });
    //})//
}


//funkce pro serazeni kolekce vzestupne
function sortInsurancesAsc(){
    //predefinujeme kolekci pojisteni jako novou kolekci, hodnoty vezmeme z puvodni a pomoci funkce sort seradime vzestupne podle jmena
    //pokud bude shoda jmen, pouzije se to cislo co jsme priradili za jmeno jako unikatni ID
    insurances = new Map([...insurances].sort());
    
    //zavolame funkci na vypsani tabulky
    fillTable();
}


//funkce na ulozeni kolekce do localstorage prohlizece
function saveData(){
    //vezme zaznamy pole, prevede je na stringy, pak na json a v json formatu je ulozi do prohlizece
    localStorage.insurances = JSON.stringify(Array.from(insurances.entries()));
}

//funkce na nacteni kolekce z localstorage prohlizece

function loadData(){
    //predefinujeme pole z rozparsovanych JSON hodnot ulozenych v prohlizeci
    insurances = new Map(JSON.parse(localStorage.insurances));
    //zavolame funkci na vypsani tabulky
    fillTable();

}

const button = document.getElementById('btn');
  button.addEventListener('click', function() {
  const form = document.createElement('form');
  const username = document.createElement('input');
  const password = document.createElement('input');
  const submit = document.createElement('input');

  form.setAttribute('method', 'post');
  form.setAttribute('action', '/login');

  username.setAttribute('type', 'text');
  username.setAttribute('name', 'username');

  password.setAttribute('type', 'password');
  password.setAttribute('name', 'password');

  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Log In');

  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  document.body.appendChild(form);
});

  

/*function hashPassword() {
    const password = getElementById("password");
    password.onclick('click', function() {
       
    })
}*/