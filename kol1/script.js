// Debugging function
function debugLog(message) {
    console.log(`[QUIZ DEBUG] ${message}`);
}

// Function to parse questions from text
function parseQuizQuestions(text) {
    const questions = [];
    const questionBlocks = text.split('Q:').slice(1); // Split by question, remove first empty element

    questionBlocks.forEach(block => {
        // Extract question text
        const lines = block.trim().split('\n');
        const questionText = lines[0].trim();

        // Extract answers and options
        const answers = [];
        let explanation = "Nema dodatnog objašnjenja.";
        let multipleAnswers = false;

        lines.forEach(line => {
            if (line.startsWith('- option:')) {
                answers.push({
                    text: line.replace('- option:', '').trim(),
                    correct: false
                });
            } else if (line.startsWith('- answer:')) {
                answers.push({
                    text: line.replace('- answer:', '').trim(),
                    correct: true
                });
                // If more than one correct answer, mark as multiple answers
                multipleAnswers = answers.filter(a => a.correct).length > 1;
            } else if (line.startsWith('- explanation')) {
                explanation = line.replace('- explanation:', '').trim();
            }
        });

        // Create question object
        const questionObj = {
            question: questionText,
            answers: answers,
            explanation: explanation
        };

        // Add multiple answers flag if applicable
        if (multipleAnswers) {
            questionObj.multipleAnswers = true;
        }

        questions.push(questionObj);
    });

    return questions;
}

// Shuffle function to randomize question order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Read the questions from the text file
const quizData = parseQuizQuestions(`Q: public Socket (String IP, int port) throws IOException" Ovaj deo koda predstavlja:
- explanation: "public Socket (String IP, int port) throws IOException" Ovaj deo koda predstavlja konstruktor klase Socket:
Ovo je konstruktor klase Socket koji prima IP adresu i port kao parametre. Konstruktor služi za kreiranje novog Socket objekta koji će uspostaviti mrežnu konekciju na zadatoj adresi i portu. Throws IOException označava da metoda može da baci izuzetak ukoliko dođe do problema prilikom uspostavljanja konekcije.

- option: Klasu Socket

- answer: Konstruktor klase Socket

- option: Metod klase Socket

Q: Koji je pravi redosled slojeva OSI modela:
- explanation: Koji je pravi redosled slojeva OSI modela:
Ovo je tačan redosled slojeva OSI (Open Systems Interconnection) modela, koji opisuje apstraktni model mrežne komunikacije. Svaki sloj ima specifičnu ulogu u procesu komunikacije, počev od fizičkog prenosa podataka do krajnje aplikativne interakcije.

- option: Fizički, Veza, Mrežni, Transportni, Sesija, Aplikativni, Prezentacioni

- option: Fizički, Veza, Transportni, Mrežni, Prezentacioni, Sesija, Aplikativni

- option: Fizički, Mrežni, Veza, Sesija, Transportni, Aplikativni, Prezentacioni

- answer: Fizički, Veza, Mrežni, Transportni, Sesija, Prezentacioni, Aplikativni

Q: Koja su dva načina za kreiranje i izvršavanje niti u Javi?
- explanation: Koja su dva načina za kreiranje i izvršavanje niti u Javi:
U Javi postoje dva glavna načina za kreiranje niti. Prvi je nasleđivanjem klase Thread, gde se prepisuje metoda run(). Drugi je implementacijom interfejsa Runnable, što pruža više fleksibilnosti jer Java ne podržava višestruko nasleđivanje.

- option: implementacijom klase Thread

- option: nasleđivanjem interfejsa Runnable

- answer: nasleđivanjem klase Thread

- option: korišćenjem metode Object.notifyAll()

- answer: implementacijom interfejsa Runnable

Q: Kod na slici prestavlja:
Runnable zadatak = () -> {System.out.println("Zadatak se izvršava");};
new Thread(zadatak).start();
- explanation: Kod na slici predstavlja upotrebu Lambda funkcija za korišćenje klase "Thread":
Prikazani kod koristi lambda izraz za definisanje Runnable zadatka, što je moderan i kraći način za kreiranje i pokretanje niti u Javi. Lambda omogućava direktno definisanje ponašanja niti bez potrebe za eksplicitnom klasom.

- option: Klasičnu upotrebu klase "Thread"

- answer: Upotrebu Lambda funkcija za korišćenje klase "Thread"

- option: Ništa od navedenog

Q: Prilikom razvoja mobilnih aplikacija za Android platformu, kompletan grafički korisnički interfejs se nalazi u:
- explanation: Prilikom razvoja mobilnih aplikacija za Android platformu, kompletan grafički korisnički interfejs se nalazi u posebnoj korisničkoj niti:
U Android razvoju, sav grafički korisnički interfejs (UI) se izvršava u glavnoj (main) niti, poznatoj kao UI thread. Ovo obezbeđuje da svi UI elementi budu ažurirani konzistentno i spreči konkurentne probleme.

- option: Prvoj slobodnoj niti

- option: Bilo kojoj niti

- answer: Posebnoj korisničkoj niti

Q: Šta je tačno za Runnable?
- explanation: Šta je tačno za Runnable:
Runnable je interfejs koji definiše jednu metodu run(), koju klase moraju implementirati da bi se mogle izvršavati kao niti. Funkcionalni interfejs znači da ima samo jednu apstraktnu metodu. Klasa Thread implementira ovaj interfejs, što omogućava kreiranje i pokretanje niti.

- answer: Runnable je funkcionalni interfejs.

- answer: Klasa Thread implementira Runnable interfejs.

- answer: Runnable ima metodu run(), koju je neophodno nadjačati u klasi koja ga implementira.

- option: Runnable je izveden iz klase Thread.

- option: Runnable je klasa koja je na vrhu hijerarhije nasledivanja svih klasa niti.

- option: Runnable definiše dve metode koje svaka klasa koja se izvršava u niti mora implementirati.

Q: Zatvaranje konekcije može inicirati:
- explanation: Zatvaranje konekcije može inicirati:
Mrežna konekcija može biti zatvorena bilo od strane klijenta ili servera, zavisno od potrebe komunikacije ili nastanka greške u komunikaciji.

- option: Samo klijent ili server

- answer: Klijent

- answer: Server

- answer: Klijent i server

- option: Samo server

- option: Samo klijent

Q: HTTP response statusni kod 3xx oznacava:
- explanation: HTTP response statusni kod 3xx oznacava:
HTTP statusni kodovi 3xx označavaju preusmeravanje, što znači da klijent mora preduzeti dodatnu akciju da bi kompletirao zahtev.

- answer: Preusmeravanje

- option: Klijentsku grešku

- option: Uspeh

- option: Informaciju

- option: Serversku grešku

Q: Koji protokoli se koriste za prenos fajlova?
- explanation: Koji protokoli se koriste za prenos fajlova:
FTP i SFTP su standardni protokoli za prenos fajlova u mreži. SFTP je sigurnija verzija jer koristi enkripciju.

- answer: FTP

- option: IMAP

- answer: SFTP

- option: SMTP

- option: POP

Q: Vertikalna skalabilnost podrazumeva dodavanje:
- explanation: Vertikalna skalabilnost podrazumeva dodavanje:
Vertikalna skalabilnost znači povećanje resursa (npr. RAM, CPU) na jednoj mašini umesto dodavanja više mašina.

- option: instance aplikacije ili baze podataka u distribuiranom sistemu

- answer: resursa jednoj aplikaciji, kao što su memorija ili procesor

Q: 192.168.1.1 je primer kako izgleda:
- explanation: 192.168.1.1 je klasičan primer IPv4 adrese, koja se koristi za lokalne mreže. IPv4 koristi 32-bitni numerički format podeljen u četiri okteta.

- option: IPv3

- answer: IPv4

- option: IPv2

- option: IPv6

Q: IP adresa je:
- explanation: IP adresa je 32-bitni ceo broj koji jedinstveno identifikuje svaki uređaj u IPv4 mreži.

- option: 64-bitni ceo broj

- answer: 32-bitni ceo broj

- option: 16-bitni ceo broj

Q: Svakom računaru u mreži se dodeljuje:
- explanation: Svakom računaru u mreži se dodeljuje jedinstvena adresa za identifikaciju i komunikaciju.

- answer: Adresa

- option: Broj

- option: Port

Q: IPv6 koristi:
- explanation: IPv6 koristi 128-bitne adrese i omogućava daleko više jedinstvenih adresa nego IPv4.

- option: 164-bitne brojeve za adrese

- option: 132-bitne brojeve za adrese

- answer: 128-bitne brojeve za adrese

Q: Realizacija sinhronizacije je bazirana na:
- explanation: Sinhronizacija se bazira na katancu (Lock), koji omogućava ekskluzivan pristup resursima i sprečava konkurenciju između niti.

- option: Mrtva petlja (eng. Deadlock)

- answer: Katanca (eng. Lock)

- option: Bravi (eng. Door Lock)

Q: Ukoliko je semafor objekat klase Semaphore, nit se prijavljuje na semafor pozivom metode:
- explanation: Metoda acquire() omogućava niti da traži pristup. Ako nema dozvola, čeka dok se jedna ne oslobodi.

- option: semafor.obtain()

- option: semafor.availablePermits()

- answer: semafor.acquire()

- option: semafor.assign()

Q: Korišćenjem mikro-servis arhitekture pruža:
- explanation: Mikro-servis arhitektura omogućava modularan razvoj gde se sistem deli na nezavisne servise – lakši razvoj i skalabilnost.

- answer: Jednostavniji razvoj aplikacije

- option: Robusnost

- option: Olakšan proces instalacije

- option: Komplikovane metode

- answer: Proširivost

Q: Koji heš se koristi za HTTP protokol:
- explanation: Koji heš se koristi za HTTP protokol:
MD5 (Message Digest 5) je heš algoritam koji se često koristi za proveru integriteta podataka u HTTP komunikaciji, iako se danas preporučuju sigurniji algoritmi.

- option: MD4 (Message Digest 4)

- answer: MD5 (Message Digest 5)

- option: SHA-2

- option: SHA-512

Q: U kojoj memoriji u Javi se čuvaju lokalne promenljive metoda:
- explanation: U kojoj memoriji u Javi se čuvaju lokalne promenljive metoda:
Lokalne promenljive metode čuvaju se u stek memoriji, koja je brza memorija namenjena radu metoda i čuvanju lokalnih podataka.

- answer: Stek memoriji

- option: ništa od navedenog

- option: referentnoj memoriji

- option: dinamičkoj memoriji

- option: heap memoriji

- option: RAM memoriji

Q: Ukoliko je semafor objekat klase Semaphore, metoda "semafor.release()":
- explanation: Ukoliko je semafor objekat klase Semaphore, metoda "semafor.release()":
Ova metoda oslobađa dozvolu, čime povećava broj dostupnih dozvola u semaforu, i omogućava drugim nitima da pristupe resursu.

- answer: kada niti više nije potreban pristup resursu, oslobađa svoju dozvolu, a broj trenutno slobodnih dozvola se inkrementira

- option: nit se prijavljuje na semafor, ukoliko ima dostupnih dozvola dobija pristup resursu i dekrementira broj trenutno slobodnih dozvola

- option: vraća broj trenutno raspoloživih dozvola

Q: Kada se program pokrene:
- explanation: Kada se program pokrene:
Java virtuelna mašina (JVM) kreira glavnu nit i poziva main() metodu – to je početna tačka izvršavanja svakog Java programa.

- option: Java virtuelna mažina kreira niti koje nisu vidljive korisniku

- answer: Java virtuelna mašina kreira main nit i poziva main() metodu programa u okviru te niti.

Q: Koji protokol koristi VoIP?
- explanation: Koji protokol koristi VoIP:
VoIP koristi UDP jer omogućava brži prenos podataka bez kašnjenja, što je ključno za glasovnu komunikaciju u realnom vremenu.

- option: TCP

- answer: UDP

Q: Prednosti višenitnog programiranja:
- explanation: Prednosti višenitnog programiranja:
Višenitno programiranje omogućava bolju iskorišćenost resursa i omogućava programu da nastavi rad čak i kada je jedna nit blokirana.

- option: Prekid rada ukoliko dođe do blokade ulazno izlazne operacije

- answer: Lakše pisanje programa

- answer: Mogućnost rada programa uprkos blokirajućoj ulazno izlaznoj operaciji

- option: Složeniji kod

Q: Programski kod treba da bude:
- explanation: Programski kod treba da bude:
Dobar kod je čitljiv, razumljiv i proširiv kako bi se lakše održavao, razumeo i nadograđivao.

- answer: Čitljiv

- option: Robustan

- option: Tajanstven

- answer: Razumljiv

- answer: Proširiv

- option: Komplikovan

- option: Opširan

- option: Nepregledan

Q: HTTP je:
- explanation: HTTP je:
HTTP je skraćenica za Hypertext Transfer Protocol, protokol za razmenu informacija između klijenta i servera.

- option: Hypermedia Transfer Protocol

- answer: Hypertext Transfer Protocol

- option: Hypertime Transfer Protocol

Q: Za HTTP dodatno zaglavlje info o pregledaču, koje ima funkciju i smer slanja od klijenta ka serveru, ima sledeći primer zaglavlja:
- explanation: HTTP zaglavlja kao što su User-Agent, Accept, Cookie, i Authorization šalju informacije o klijentu serveru.

- answer: If-Modified-Since, If-None-Match, Date, Last-Modified, Expires, Cache-Control, ETag

- answer: User-Agent, Accept, Accept-charset, Accept-Encoding, Accept-Language

- answer: Cookie, Referer, Authorization, Host

- option: Content-Encoding, Content-Length, Content-Type, Content-Language, Content-Range, Set-Cookie

Q: U Javi, ukoliko se koristi semafor, nit koja želi da pristupi resursu treba da traži dozvolu. Dozvolu će dobiti samo u kom slučaju?
- explanation: Semafor daje dozvolu samo ako je broj dostupnih dozvola veći od nule. U suprotnom, nit čeka.

- option: vrednost semafora je tačno 0.

- option: vrednost semafora je tačno 1.

- answer: vrednost semafora je veća od 0.

- option: vrednost semafora je veća od 1.

- option: vrednost semafora je manja od 0.

Q: Na kom portu radi POP3?
- explanation: POP3 (Post Office Protocol v3) standardno koristi port 110 za preuzimanje e-pošte.

- option: 101

- option: 113

- answer: 110

- option: 112

- option: 111

- option: 10

- option: 100

Q: Koliko osnovnih operacija može da izvrši soket?
- explanation: Soket može izvršiti 7 osnovnih operacija uključujući povezivanje, slanje, prijem, itd.

- option: 17

- option: 1

- option: 8

- option: 6

- option: 18

- option: 5

- option: 9

- option: 19

- answer: 7

Q: Šta obezbeđuje paralelizam u radu servera:
- explanation: Niti omogućavaju da server izvršava više zadataka paralelno, pa više klijenata može istovremeno biti usluženo.

- answer: Niti

- option: Čvorovi

- option: Sinhronizacija

Q: Ukoliko je semafor objekat klase Semaphore, metoda "semafor.acquire()":
- explanation: Ova metoda zauzima dozvolu. Ako je nijedna nije dostupna, nit se blokira dok ne postane dostupna.

- option: kada niti više nije potreban pristup resursu, oslobađa svoju dozvolu, a broj trenutno slobodnih dozvola se inkrementira

- option: vraća broj trenutno raspoloživih dozvola

- answer: nit se prijavljuje na semafor, ukoliko ima dostupnih dozvola dobija pristup resursu i dekrementira broj trenutno slobodnih dozvola

Q: Aplikacija bi trebalo da bude skalabilna u smislu da:
- explanation: Skalabilna aplikacija može da se širi i razvija — kako po resursima, tako i po svojoj arhitekturi.

- option: se ne mogu dodavati resursi

- option: da se sama aplikcija ne menja

- answer: se mogu dodavati resursi

- answer: da se sama aplikacija menja

Q: Komponente monolitnog programa su:
- explanation: U monolitnoj arhitekturi komponente su usko povezane i međuzavisne.

- option: Nepovezane

- answer: Povezane

- answer: Međusobno zavisne

- option: Međusobno nezavisne

Q: Sinhronizacija može dovesti do problema:
- explanation: Deadlock (mrtva petlja) se može desiti ako dve niti čekaju jedna drugu da oslobodi resurs — i nijedna ne nastavlja.

- answer: Mrtve petlje (eng. Deadlock)

- option: Katanca (eng. Lock)

- option: Brave (eng. Door Lock)

Q: Soketi omogućavaju programeru da tretira mrežnu konekciju kao:
- explanation: Soket omogućava dvosmernu komunikaciju — pisanje i čitanje podataka, kao da radimo sa fajlovima.

- option: Tok podataka u koji može samo upisivati podatke

- answer: Tok podataka u koji može upisivati i iz kog može čitati podatke

- option: Tok podataka u koji može samo čitati podatke

Q: Implementacije bazirane na mikro-servisima nikada ne smeju da imaju:
- explanation: Mikro-servisi bi trebalo da eliminišu "jednu tačku pada" (single point of failure), radi otpornosti sistema.

- answer: Jednu tačku pada sistema

- option: Samo jednu tačku pada sistema

- option: Više tačaka pada sistema

Q: Metoda "sleep" klase Thread:
- explanation: Metoda sleep() stavlja nit u stanje mirovanja određeni broj milisekundi. Ovo pauzira izvršavanje bez gašenja niti.

- answer: označava nit u kojoj se metoda izvršava prelazi u stanje spavanja za navedeni broj milisekundi

- option: provera statusa izvršavanja neke niti

- option: označava da jedna nit čeka da se druga nit završi, i da tek onda nastavi izvršavanje

- option: označava da jedna nit može poslati signal prekida drugoj niti i da uradi nešto sasvim drugo

- option: označava da JVM svakoj niti dodeljuje prioritet sa kojim se izvršava

Q: Kada je potrebno da jedna nit sačeka drugu da završi sa radom pre nego što nastavi svoje izvršavanje koristi se metoda:
- explanation: join() metoda omogućava da jedna nit sačeka završetak druge niti pre nego što nastavi svoj rad.

- option: close()

- option: wait()

- option: start()

- option: stop()

- option: colapse()

- answer: join()

Q: Kod koji treba da se izvršava u paralelnoj niti, potrebno je staviti u telo metode:
- explanation: U Java niti, kod koji treba da se izvršava u drugoj niti mora biti unutar run() metode.

- option: join()

- option: start()

- option: init()

- option: execute()

- answer: run()

Q: Na kom portu HTTPS inicira komunikaciju preko TCP konekcije?
- explanation: HTTPS koristi port 443 za sigurnu komunikaciju putem SSL/TLS.

- option: 80

- option: 344

- option: 434

- option: 8080

- answer: 443

- option: 343

Q: Nove niti se mogu kreirati putem:
- explanation: Niti se mogu kreirati korišćenjem konstruktora klase Thread uz prosleđen Runnable objekat.

- option: Implementiranjem interfejsa "Runnable"

- option: Instanciranjem klasa koje treba da budu izvršene u nitima

- answer: Konstruktora klase "Thread"

- option: Instanciranjem klase koja je izvedena iz klase "Thread"

Q: Kada se katanac zaključava?
- explanation: Katanac (lock) se aktivira kada se izvrši sinhronizovana metoda ili blok – omogućava ekskluzivan pristup resursima.

- option: Kada se izvrši sinhrona metoda

- option: Kada se izvrši sekvencijalna metoda

- option: Kada se izvrši sinhrona naredba

- option: Kada se izvrši asinhrona metoda

- answer: Kada se izvrši sinhronizovana metoda

- option: Kada se izvrši sekvencijalna naredba

- option: Kada se izvrši naredba sinhronizacije

- option: Kada se izvrši asinhrona naredba

Q: HTTP response statusni kod 5xx označava:
- explanation: Kodovi 5xx signaliziraju da je došlo do greške na strani servera tokom obrade zahteva.

- option: Informaciju

- option: Klijentsku grešku

- answer: Serversku grešku

- option: Uspeh

- option: Preusmeravanje

Q: Na kom sloju OSI modela se nalazi TCP protokol?
- explanation: TCP (Transmission Control Protocol) radi na transportnom sloju OSI modela.

- option: Veze

- option: Aplikativni

- option: Fizički

- answer: Transportni

- option: Prezentacioni

- option: Sesije

- option: Mrežni

Q: U mikro-servis arhitekturi, aplikacija se:
- explanation: Mikro-servis arhitektura deli aplikaciju na nezavisne funkcionalne celine (servise).

- option: komponuje kao jedna celina

- answer: dekomponuje na više servisa

Q: HTTP protokol funkcioniše kao:
- explanation: HTTP koristi model zahteva i odgovora – klijent šalje zahtev, server vraća odgovor.

- answer: request-response protokol

- option: send-recieve protokol

Q: Kako se rešava mehanizam uzajamne isključivosti pristupu deljenom resursu u Javi?
- explanation: Uzajamna isključivost se rešava upotrebom synchronized metoda i blokova koji osiguravaju da samo jedna nit pristupa resursu.

- option: Preko asinhronih metoda i naredbi

- answer: Preko sinhronizovanih metoda i naredbi

- option: Preko sekvencijalnih metoda i naredbi

- option: Preko sinhronih metoda i naredbi

Q: Neka od pitanja na koja inženjeri treba da odgovore pre pristupa samom razvoju aplikacije:
- explanation: Planiranje razvoja zahteva razmatranje tehnologija i funkcionalnih zahteva aplikacije.

- option: Izbor arhitekture

- answer: Izbor tehnologija

- option: Izbor projekta

- answer: Funkcionalni zahtevi koje treba implementirati

Q: System.out.println("Vrednost je: " + vrednost); dostupna = false; notifyAll(); return vrednost;
Kod iznad služi da:
- explanation: Kod obaveštava potrošača da proizvođač više ne koristi podatke i da se resurs može koristiti.

- answer: Proizvođač obavesti potrošača o tome da želi da izmeni sadržaj koji potrošač eventualno želi da koristi.

- answer: Potrošač obavesti potrošača o tome da sadržaj koji želi da izmeni trenutno zauzet.

- option: Potrošač obaveštava da je sadržaj koji proizvođač eventualno želi da uzme trenutno zauzet

- option: Potrošač obavesti potrošača o tome da sadržaj koji želi da izmeni trenutno zauzet.

Q: Kada se koriste anonimne klase?
- explanation: Anonimne klase se koriste kada nam treba objekat klase koja se koristi samo jednom i nije potrebna za dalje korišćenje.

- answer: Kada je potrebno konstruisati samo jedan objekat te klase

- option: Kada je potrebno konstruisati jedan ili više objekata te klase

- option: Kada je potrebno konstruisati više objekata jedne klase

Q: Objekat klase "Thread" ima jednu svrhu:
- explanation: Glavna svrha Thread objekta je izvršavanje koda koji se nalazi unutar run() metode.

- option: da izvrši zadatak koji se nalazi u njegovoj main metodi

- answer: da izvrši zadatak koji se nalazi u jednoj njegovoj specijalnoj metodi

Q: PLT je:
- explanation: Page Load Time (PLT) predstavlja vreme koje protekne od klika na link do potpune učitanosti stranice.

- option: Vreme izvršavanja jednog po jednog zadataka u trenutku.

- answer: Vreme koje protekne od trenutka kada korisnik klikne na link do trenutka otvaranja dokumenta.

Q: Ukoliko je t objekat tipa Thread, i u nekoj drugoj niti napišemo t.join(), druga nit...
- explanation: t.join() izaziva da druga nit sačeka dok se nit t potpuno ne završi.

- option: se prekida kako bi prepustila procesor prvoj niti.

- answer: prelazi u stanje spavanja dok se nit t kompletno ne završi.

- option: nastavlja normalno sa izvršavanjem, odnosno poziv ove metode nema efekta na drugu nit.

- option: će pokrenuti nit t i prepustiti joj procesor.

Q: ,,(lista argumenata) -> telo metode" predstavlja:
- explanation: Ovo je sintaksa za lambda izraz – kraći oblik definisanja funkcionalnog interfejsa.

- option: Lokalne klase

- option: Anonimne klase

- answer: Lambda izraz

- option: Konstruktor

Q: HTTP response statusni kod 2xx označava:
- explanation: Status kodovi 2xx znače da je zahtev uspešno obrađen.

- option: Serversku grešku

- option: Preusmeravanje

- option: Informaciju

- answer: Uspeh

- option: Klijentsku grešku

Q: Ukoliko je semafor objekat tipa Semaphore, broj raspoloživih dozvola se dobija pozivom metode:
- explanation: availablePermits() metoda vraća broj trenutno dostupnih dozvola u semaforu.

- option: semafor.licences()

- answer: semafor.availablePermits()

- option: semafor.numPermits()

- option: semafor.getPermits()

- option: semafor.acquire()

Q: Aplikacija je skalabilna ako:
- explanation: Aplikacija je skalabilna ako može da koristi više resursa bez potrebe za promenom njenog koda.

- option: Se ne mogu dodavati resursi, a aplikacija se menja

- answer: Se mogu dodavati resursi, a da se aplikacija ne menja

Q: Upotrebom lambda izrazima:
- explanation: Lambda izrazi omogućavaju kraći i pregledniji kod uklanjanjem potrebe za anonimnim klasama.

- option: Kod postaje nepregledniji

- option: Dodaju se neophodni delovi koda

- answer: Eliminiše se višak koda

- answer: Kod je jasnije napisan

Q: Mrtva petlja u višenitnom okruženju može nastati u sledećim slučajevima:
- explanation: Deadlock može nastati kada dve niti čekaju jedna drugu unutar sinhronizovanih blokova ili metoda.

- option: Jedna sinhronizovana metoda se poziva iz iste sinhronizovane metode.

- answer: Jedna sinhronizovana metoda se poziva iz druge sinhronizovane metode.

- answer: Postoje ugnježdeni sinhronizovani blokovi.

- option: Jedna sinhronizovana metoda se ne poziva.

- option: Ne postoje ugnježdeni sinhronizovani blokovi.

Q: Za HTTP dodatno zaglavlje tip sadržaja, koje ima funkciju i smer slanja od servera ka klijentu, ima sledeći primer zaglavlja:
- explanation: Ova zaglavlja definišu tip i karakteristike sadržaja koji server šalje klijentu.

- option: If-Modified-Since, If-None-Match, Date, Last-Modified, Expires, Cache-Control, ETag

- option: User-Agent, Accept, Accept-charset, Accept-Encoding, Accept-Language

- option: Cookie, Referer, Authorization, Host

- answer: Content-Encoding, Content-Length, Content-Type, Content-Language, Content-Range, Set-Cookie

Q: Jedna od preopterećenih "join" metoda je:
- explanation: join(long millis) omogućava čekanje određeno vreme pre nego što nit nastavi, čak i ako druga nije završena.

- answer: void join(long millis)

- option: void join(small millis)

- option: void join(last millis)

- option: void join(long mile)

Q: Sekvencijalno programiranje je:
- explanation: Sekvencijalno programiranje znači da se instrukcije izvršavaju jedna po jedna, redom.

- answer: Programiranje jedne po jedne stvari u trenutku

- option: Programiranje više stvari od jednom

- option: Programiranje više stvari naizmenično

Q: Kojom metodom se pokreće nit?
- explanation: start() metoda pokreće novu nit i poziva run() u okviru nje.

- option: runInParallel()

- answer: start()

- option: runOnUiThread()

- option: run()

- option: execute()

Q: Alat za centralno skladištenje programskog koda je:
- explanation: Git je sistem za verzionisanje koda koji omogućava saradnju i praćenje izmena.

- option: Geet

- answer: Git

- option: BitBucket

- option: Trello

Q: Ograničenje kod portova je:
- explanation: Portovi od 0 do 1024 su "well-known" i rezervisani za standardne servise poput HTTP (80), HTTPS (443), itd.

- option: da su brojevi od 1024 do 1224 rezervisani za standardne veb servise

- answer: da su brojevi od 0 do 1024 rezervisani za standardne veb servise

- option: da su brojevi od 1200 do 1846 rezervisani za standardne veb servise

- option: da su brojevi od 0 do 102 rezervisani za standardne veb servise

Q: Za HTTP dodatno zaglavlje info o keširanju, koje ima funkciju i smer slanja od klijenta ka serveru i obrnuto, ima sledeći primer zaglavlja:
- explanation: Ova zaglavlja omogućavaju kontrolu keširanja između klijenta i servera, optimizujući performanse.

- answer: If-Modified-Since, If-None-Match, Date, Last-Modified, Expires, Cache-Control, ETag

- option: Cookie, Referer, Authorization, Host

- option: Content-Encoding, Content-Length, Content-Type, Content-Language, Content-Range, Set-Cookie

- option: User-Agent, Accept, Accept-charset, Accept-Encoding, Accept-Language

Q: U kom Java paketu se nalaze klase za konkurentno programiranje?
- explanation: Paket java.util.concurrent sadrži alate i klase za rad sa nitima, semaforima i drugim konkurentnim strukturama.

- option: ništa od navedenog

- option: java.util.programming.concurrent

- answer: java.util.concurrent

- option: java.concurrent

- option: java.lang.Object

- option: java.lang.concurrent

Q: Ukoliko je semafor objekat klase Semaphore, metoda "semafor.availablePermits()":
- explanation: Ova metoda vraća broj trenutno dostupnih dozvola bez promene njihovog broja.

- option: nit se prijavljuje na semafor, ukoliko ima dostupnih dozvola dobija pristup resursu i dekrementira broj trenutno slobodnih dozvola

- option: kada niti više nije potreban pristup resursu, oslobađa svoju dozvolu, a broj trenutno slobodnih dozvola se inkrementira

- answer: vraća broj trenutno raspoloživih dozvola

Q: Metoda ".setPriority()" klase "Thread" može da menja prioritet izvršavanja niti JVM. Ova metoda sadrži konstante koje imaju vrednosti 1, 5 i 10. Te konstante su:
- explanation: Java koristi tri konstante za prioritet niti: MIN_PRIORITY (1), NORM_PRIORITY (5), MAX_PRIORITY (10).

- answer: NORM_PRIORITY

- answer: MAX_PRIORITY

- option: NORMAL_PRIORITY

- option: MINIMAL PRIORITY

- option: MIN_THREAD_NO

- option: MAX_THREAD_NO

- option: MAXIMAL_PRIORITY

- option: NORM_THREAD_NO

- answer: MIN_PRIORITY

Q: Kako se predstavlja nit u Java programskom jeziku i koji interfejs implementira?
- explanation: Niti se u Javi predstavljaju klasom Thread, koja implementira interfejs Runnable.

- option: Nit se predstavlja klasom Runnable, koja implementira interfejs Thread.

- option: Nit se predstavlja klasom Thread, koja implementira interfejs Executable.

- answer: Nit se predstavlja klasom Thread, koja implementira interfejs Runnable.

- option: Nit se predstavlja klasom Task, koja implementira interfejs Thread.

- option: Nit se predstavlja klasom Runnable, koja implementira interfejs Task.

- option: Nit se predstavlja klasom Task, koja implementira interfejs Runnable.

Q: "Socket soket = server.accept();" Dati deo koda predstavlja:
- explanation: Ova linija koda označava da server prihvata zahtev za konekciju od klijenta.

- option: Slanje zahteva za konekciju

- answer: Odgovor na zahtev za konekciju

Q: Metode klase Thread su:
- explanation: Klasa Thread uključuje metode za upravljanje izvršavanjem niti: sleep(), join(), interrupt() i druge.

- answer: sleep()

- option: toString()

- option: concat()

- answer: interrupt()

- option: equals()

- option: isAlive()

- answer: join()

Q: Kako se naziva svaki funkcionalan računar u mreži?
- explanation: Svaki funkcionalan uređaj u mreži koji može da šalje i prima podatke naziva se host.

- option: Guest

- option: Administrator

- option: Visitor

- answer: Host
`);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOM Content Loaded');

    // Create question selection modal with dynamic options
    function createQuestionSelectionModal() {
        // Define question count options based on total questions
        const totalQuestions = quizData.length;
        const options = [
            { count: 10, label: '10 pitanja' },
            { count: 20, label: '20 pitanja' },
            { count: 50, label: '50 pitanja' },
            { count: 75, label: '75 pitanja' },
            { count: 100, label: '100 pitanja' },
            { count: totalQuestions, label: `Sva pitanja (${totalQuestions})` }
        ].filter(option => option.count <= totalQuestions);

        // Generate buttons HTML
        const buttonsHtml = options.map(option => 
            `<button data-count="${option.count}">${option.label}</button>`
        ).join('');

        const modalHtml = `
        <div id="question-selection-modal" class="modal">
            <div class="modal-content">
                <h2>Izaberi broj pitanja</h2>
                <p>Ukupno pitanja: ${totalQuestions}</p>
                <div class="question-options">
                    ${buttonsHtml}
                </div>
            </div>
        </div>
        `;

        // Create modal element
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml.trim();
        const modal = modalContainer.firstChild;
        document.body.appendChild(modal);

        // Add styles to the modal
        const modalStyles = `
        .modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background-color: var(--surface-dark);
            padding: 40px;
            border-radius: 15px;
            width: 90%;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }
        .modal-content h2 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }
        .modal-content p {
            color: var(--text-secondary);
            margin-bottom: 25px;
        }
        .question-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .question-options button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .question-options button:hover {
            background-color: #2980b9;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }
        `;

        // Add styles to the document
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);

        return modal;
    }

    // Show question selection modal
    function showQuestionSelectionModal() {
        const modal = document.getElementById('question-selection-modal') || createQuestionSelectionModal();
        modal.style.display = 'flex';

        // Add event listeners to option buttons
        const optionButtons = modal.querySelectorAll('.question-options button');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const questionCount = parseInt(button.dataset.count);
                
                // Shuffle and select questions
                const randomizedQuizData = shuffleArray([...quizData]);
                const selectedQuizData = randomizedQuizData.slice(0, questionCount);

                // Close modal
                modal.style.display = 'none';

                // Start quiz with selected questions
                startQuizWithQuestions(selectedQuizData);
            });
        });
    }

    // Attempt to find DOM elements
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');

    // Log element existence
    debugLog(`Question Text Element: ${!!questionText}`);
    debugLog(`Answer Buttons Element: ${!!answerButtons}`);
    debugLog(`Next Button Element: ${!!nextButton}`);
    debugLog(`Explanation Container Element: ${!!explanationContainer}`);
    debugLog(`Explanation Text Element: ${!!explanationText}`);
    debugLog(`Current Question Span Element: ${!!currentQuestionSpan}`);
    debugLog(`Total Questions Span Element: ${!!totalQuestionsSpan}`);

    // Verify all elements exist
    const requiredElements = [
        { element: questionText, name: 'question-text' },
        { element: answerButtons, name: 'answer-buttons' },
        { element: nextButton, name: 'next-btn' },
        { element: explanationContainer, name: 'explanation-container' },
        { element: explanationText, name: 'explanation-text' },
        { element: currentQuestionSpan, name: 'current-question' },
        { element: totalQuestionsSpan, name: 'total-questions' }
    ];

    const missingElements = requiredElements.filter(item => !item.element);
    if (missingElements.length > 0) {
        console.error('Missing DOM elements:', 
            missingElements.map(item => item.name).join(', '));
        return;
    }

    debugLog(`Total Questions: ${quizData.length}`);

    let currentQuestionIndex = 0;
    let shuffledQuestions = [];

    // Start quiz with specific questions
    function startQuizWithQuestions(questions) {
        // Update global quiz data for this session
        shuffledQuestions = questions;
        currentQuestionIndex = 0;
        
        // Update total questions
        totalQuestionsSpan.textContent = shuffledQuestions.length;
        
        // Reset UI
        nextButton.classList.add('hidden');
        explanationContainer.classList.add('hidden');
        
        // Show first question
        showQuestion();
    }

    // Modify existing initQuiz to show modal first
    function initQuiz() {
        debugLog('Initializing Quiz');
        showQuestionSelectionModal();
    }

    // Show current question
    function showQuestion() {
        // Reset the state
        resetState();
        
        // Get current question
        const currentQuestionData = shuffledQuestions[currentQuestionIndex];
        const questionTextElement = document.getElementById('question-text');
        const answerButtonsContainer = document.getElementById('answer-buttons');

        // Display question text
        questionTextElement.textContent = currentQuestionData.question;

        // Determine if it's a multi-answer question
        const isMultiAnswer = currentQuestionData.answers.filter(a => a.correct).length > 1;

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Potvrdi odgovor';
        submitButton.id = 'submit-answer-btn';
        submitButton.classList.add('hidden');
        
        // Create answer buttons
        currentQuestionData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            
            // Determine input type based on number of correct answers
            const inputType = isMultiAnswer ? 'checkbox' : 'radio';
            
            // Create a wrapper div to simulate input
            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('answer-wrapper');
            buttonWrapper.classList.add(inputType + '-wrapper');
            
            // Add custom input-like element
            const inputIndicator = document.createElement('span');
            inputIndicator.classList.add('input-indicator');
            inputIndicator.classList.add(inputType);
            
            buttonWrapper.appendChild(inputIndicator);
            buttonWrapper.appendChild(button);

            // Track selected state
            let isSelected = false;
            
            buttonWrapper.addEventListener('click', () => {
                if (isMultiAnswer) {
                    // Toggle selection for multi-answer
                    isSelected = !isSelected;
                    buttonWrapper.classList.toggle('selected', isSelected);
            } else {
                    // Deselect all other buttons for single-answer
                    document.querySelectorAll('.answer-wrapper').forEach(wrapper => {
                        wrapper.classList.remove('selected');
                    });
                    buttonWrapper.classList.add('selected');
                }

                // Show submit button when at least one answer is selected
                const selectedAnswers = document.querySelectorAll('.answer-wrapper.selected');
                submitButton.classList.toggle('hidden', selectedAnswers.length === 0);
            });

            // Store answer data on the wrapper
            buttonWrapper.answerData = answer;
            
            answerButtonsContainer.appendChild(buttonWrapper);
        });

        // Add submit button
        answerButtonsContainer.appendChild(submitButton);

        // Add submit button event listener
        submitButton.addEventListener('click', () => {
            // Collect selected answers
            const selectedWrappers = document.querySelectorAll('.answer-wrapper.selected');
            const selectedAnswers = Array.from(selectedWrappers).map(wrapper => wrapper.answerData);

            // Check answers
            let allCorrect = true;
            let someCorrect = false;

            // For single-answer questions
            if (!isMultiAnswer) {
                allCorrect = selectedAnswers[0] && selectedAnswers[0].correct;
            } else {
                // For multi-answer questions, check if selected answers match correct answers
                const correctAnswers = currentQuestionData.answers.filter(a => a.correct);
                
                // Check if selected answers exactly match correct answers
                allCorrect = selectedAnswers.length === correctAnswers.length && 
                    selectedAnswers.every(selected => 
                        correctAnswers.some(correct => correct.text === selected.text)
                    );
                
                // Check if at least some answers are correct
                someCorrect = selectedAnswers.some(selected => 
                    currentQuestionData.answers.some(a => a.correct && a.text === selected.text)
                );
            }

        // Highlight answers
            document.querySelectorAll('.answer-wrapper').forEach(wrapper => {
                const answer = wrapper.answerData;
                wrapper.classList.remove('selected');
                
                if (answer.correct) {
                    wrapper.classList.add('correct');
            } else {
                    wrapper.classList.add('incorrect');
                }
            });
        
        // Show explanation
            const explanationContainer = document.getElementById('explanation-container');
            const explanationText = document.getElementById('explanation-text');
            explanationText.textContent = currentQuestionData.explanation;
        explanationContainer.classList.remove('hidden');

            // Disable further selections
            submitButton.disabled = true;
        
        // Show next button
            const nextButton = document.getElementById('next-btn');
        nextButton.classList.remove('hidden');
        });
    }

    // Reset quiz state between questions
    function resetState() {
        // Clear previous answers
        answerButtons.innerHTML = '';
        
        // Hide next button and explanation
        nextButton.classList.add('hidden');
        explanationContainer.classList.add('hidden');
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        
        // Check if quiz is finished
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion();
        } else {
            // End of quiz
            questionText.textContent = 'Kviz je završen!';
            answerButtons.innerHTML = '';
            nextButton.classList.add('hidden');
            explanationContainer.classList.add('hidden');
        }
    }

    // Event Listeners
    nextButton.addEventListener('click', nextQuestion);

    // Modify the start of quiz initialization
    debugLog('Calling initQuiz');
    initQuiz();
    
}); 