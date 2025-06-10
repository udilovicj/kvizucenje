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
const quizData = parseQuizQuestions(`Q:  Koji od sledećih iskaza su tačni (označti 2 tačna odgovora):
- option:  VDI tehnologija generiše prednosti kada se izvršava aplikacija koja zahteva specijalizovani hardver
- option:  Infrastruktura virtuelnog desktopa u značajnoj meri olakšava procese upravljanja softverom, nadogradnje softvera (eng. software upgrades) i podrške korisnicima zato što se sve virtuelne mašine otpremaju na dva ili više povezana servera
- answer:  Promovisanje politike BYOD omogućava VDI
- answer:  Pomoću tehnologije virtuelnog desktopa mogu da se naprave skupovi desktop okruženja (eng. virtual desktop pools) koji se koriste od strane više korisnika istovremeno, a takođe mogu da se naprave i lična desktop okruženja (eng. personal desktop environments) koja koriste individualni korisnici
- option:  VDI tehnologija generiše prednosti kada se izvršava aplikacija koja zahteva 3D
renderovanje

Q:  Skup alata modela PaaS se obično sastoji iz sledećeg (označiti 3 tačna odgovora):
- option:  SSH server
- answer:  programskog okruženja
- option:  FTP servera
- answer:  baze podataka
- answer:  sigurnosnih mehanizama
- option:  operativnog sistema
- option:  prekonfigurisane virtuelne instance

Q:  U odnosu na fizičku lokaciju računarskog centra, neke od forme organizovanja su (označiti 2 tačna odgovora):
- answer:  Distribuirano hostovanje
- option:  Kolokacioni računski centar
- option:  Delimično zamršeni računski centar
- option:  Zamršeni računski centar
- answer:  Centralizovano hostovanje
- option:  Hostovanje kojim se upravlja




Q:  Jedna od najznačajnijih prednosti modela PaaS je:
- option:  Klijent ne zna gde je fizički lociran server
- option:  Zavisnost od mreže klaud provajdera
- answer:  Interoperabilnost i portabilnost
- option:  Klijent je odgovoran za čuvanje i pravljenje rezervnih kopija podataka
- option:  Ništa od navedenog

Q:  Koji od sledećih iskaza je tačan:
- option:  Ništa od navedenog nije tačno
- answer:  Najvažnija prednost virtuelizacije je apstrakcija usluga klijentima
- option:  Začetnik konvergirane infrastrukture je kompanija IBM
- option:  NIC Teaming je postao de facto standard Q:  godine
- option:  Hub and spoke topologija se koristi u klaud centrima podataka
- option:  Prva mreža zasnovana na klaudu je bila GLONET

Q:  Koje su od sledećih tvrdnji nisu tačne (označiti 2 tačna odgovora).
- option:  Zajednički klaud može da bude u vlasništvu i da se njime upravlja od strane jedne ili više organizacija koje pripadaju zajednici, neke treće strane, ili kombinacije ova dva.
- option:  Hibridni klaud omougćava deljenje podataka i aplikacija između privatnog i javnog klauda.
- answer:  Jedan od najvećih nedostataka hibridnog klauda nedostatak u vidu potpune fleksibilnosti, zato što platforma zavisi od dobavljača usluge.
- option:  Javni klaud je optimalna solucija kada se razvija i testira jedna izolovana aplikacija.
- answer:  U slučaju privatnog klauda, raspoloživi resursi su uvek potpuno iskorišćeni

Q:  Da li je sledeća tvrdnja tačna? Klaud provajderi koriste hiper konvergirane tehnologije za razvoj javnog i hibridnog klaud okruženja i mogu da ponude svoje usluge individualnim i korporativnim klijentima po značajno nižim troškovima.
- answer:  Da
- option:  Ne


Q:  U optičkim mrežama se koriste sledeći konektori (označiti 3 uljeza):
- option:  MTRJ
- answer:  CL
- option:  LC
- answer:  MTJR
- option:  ST
- answer:  TS
- option:  SC

Q:  Koji od sledećih iskaza o mobilnoj mreži 4G su tačni (označiti 2 odgovora):
- option:  podržava propusni opseg od 1 Gb/s kada je korisnik u pokretu
- option:  podržava propusni opseg od 10 Gb/s kada je korisnik u mestu, ili kada se kreće sporo   
 - answer:  podržava propusni opseg od 300 Mb/s kada je korisnik u pokretu
- option:  propusni opseg eksponencijalno opada kada se korisnik kreće, i tada je propusni opseg samo 50 Mb/s
- answer:  podržava propusni opseg od 1 Gb/s kada je korisnik u mestu, ili kada se kreće sporo     
 - option:  podržava propusni opseg od 100 Mb/s kada je korisnik u pokretu

Q:  Kada se klaud računarstvo posmatra kao koncept, mogu da se izdvoje tri kategorije aktera (učesnika) u sistemu (označiti 3 tačna odgovora):
- answer:  CSP
- option:  Vendor računarskih resursa
- option:  Menadžment
- answer:  Korisnici
- answer:  Posrednik







Q:  Koji od sledećih iskaza je tačan:
- option:  Ništa od navedenog nije tačno.
- option:  Konekcija ka skladištima priključenim na mrežu se uspostavlja putem lične mreže.
- option:  Kao jedna od ključnih karakteristika lokalnih skladišnih mreža u literaturi se navodi da postoji kompatibilnost sa različitim operativnim sistemima i fajl sistemima
- answer:  Tehnologija skladišta priključenih na mrežu se implementira uz nešto veće počtne troškove.
- option:  Zbog činjenice da je mrežna segmentacija u slučaju virtuelnih mreža zasnovana na logičkoj podeli mreže putem specijalizovanog hardvera, za rekonfigurisanje mreže je potrebno manje vremena i manje radne snage nego što je to slučaj u tradicionalnim okruženjima.

Q:  Konvergirana infrastruktura može da se definiše kao IT infrastruktura koja koristi najbolje prakse iz računarstva u procesu izbora serverskih, mrežnih i resursa za skladištenje podataka koji se alociraju dinamički kada se za to ukaže potreba.
- answer:  TAČNO
- option:  NETAČNO

Q:  Da li je sledeća tvrdnja tačna? Konvergirana infrastruktura može da se definiše kao IT infrastruktura koja ne koristi najbolje prakse iz računarstva u procesu izbora serverskih, mrežnih i resursa za skladištenje podataka, koji se alociraju (eng. "allocate") na zahtev (eng. "on- option: demand") raznim operativnim okruženjima i aplikacijama.
- answer:  Ne
- option:  Da

Q:  Šta od navedenog spada u značajnije kategorije troškova tradicionalne IT infrastrukture (3 tačna odgovora):
- option:  Troškovi implementiranja hipervizora
- answer:  Troškovi hardvera
- answer:  Troškovi upravljanja
- option:  Troškovi klaud platforme
- answer:  Troškovi objekata za skladištenje opreme
- option:  Troškovi razvoja novih modela apstrakcije resursa

Q:  IT silos može da se definiše kao:
- option:  Skup IT resursa koji poseduje i kontroliše jedna lokacija u organizaciji
- answer:  Skup IT resursa koji poseduje i kontroliše određena organizaciona jedinica, ili odeljenje u organizaciji.
- option:  Skup IT resursa koji poseduje i kontroliše jedna upravljačka jedinica u organizaciji
- option:  Skup IT resursa koji poseduje i kontroliše određena poslovna grupa u organizaciji

Q:  Da li je sledeća tvrdnja tačna? Tradicionalna troslojna arhitektura može da odgovori dovoljno brzo na zahteve poslovnog okruženja u kome korporacija posluje i omogućuje implementiranje proaktivne strategije konkurentnosti.
- option:  Da
- answer:  Ne

Q:  Neki od često korišćenih protokola za autentifikaciju su (označiti 3 tačna odgovora):
- option:  Samba
- option:  WINS
- option:  HTTPS
- answer:  Kerberos
- answer:  RADIUS
- option:  SMB
- option:  SHTTP
- option:  CIFS
- answer:  NTLM

Q:  Standard TIA/EIA- option: 568 odnosi se na:
- option:  Žične mreže                                                                                                                                                                     - option:  HP servere
- option:  Hiperkonvergirane servere
- answer:  TP kablove
- option:  Bezične mreže
- option:  Virtuelne komutatore


Q:  Termin baremetal hipervizor odnosi se na:
- answer:  Hipervizor koji je implementiran neposredno iznad hardvera
- option:  Hipervizor koji je implementiran iznad operativnog sistema
- option:  Hipervizor koji je implementiran u formi aplikacije neposredno iznad hardvera
- option:  Hipervizor koji je implementiran kao servis na host računaru

Q:  Tipovi klaud računarstva prema modelu ispiruke su (izbaciti 3 uljeza):
- answer:  Hostovani klaud
- option:  Hibridni klaud
- answer:  Personalni klaud
- answer:  Zaštićeni klaud
- option:  Zajednički klaud

Q:  Kako se zove uloga u organizaciji koja približava IT poslovanju organizacionih jedinica:
- option:  IT DA
- answer:  IT BA
- option:  IT SE
- option:  IT Admin

Q:  Da li je sledeća tvrdnja tačna? Virtuelizacija servera je primarna komponenta koja se koristi u izradnji hiper- option: konvergiranog okruženja, koje se najčešće koristi u klaud računarstvu. U ovako postavljenom okruženju, virtuelne mašine se izvršavaju na računaru domaćinu (eng. "Host computer") i takvo okruženje omogućava da više servera koegzistira na jednoj hardverskoj platformi.
- option:  Ne
- answer:  Da




Q:  Računarske mreže koje su prve koristile simbol oblaka u vizuelnoj reprezentacji računarskih mreža su:
- answer:  CSNET
- option:  CDNET
- option:  GLONET
- answer:  ARPANET
- option:  CONET
- option:  APRANET

Q:  Prema kompaniji HP, neke od faza tranzicije od tradicionalnog do konvergiranom računskom centru su (označiti 3 tačna odgovora):
- option:  Konsolidacija i specijalizacija
- answer:  Dinamičko dodavanje resursa na zahtev
- option:  Sagregacija virtuelnih mašina i skladišta
- answer:  Standardizacija i konsolidacija
- answer:  Dinamičko korišćenje i hibridna isporuka usluga
- option:  Autonomna automatizacija
- option:  Virtuelizacija i paravirtuelizacija

Q:  Dve osnovne tehnologije koje se implementiraju u virtuelnim skladištima su (označiti 2 tačna odgovora):
- option:  PAS
- option:  MAN
- answer:  SAN
- answer:  NAS
- option:  LAN
- option:  DAS
- option:  PAN

Q:  Da li je sledeća tvrdnja tačna? Konvergirana infrastruktura objedinjuje servere, skladišni prostor, mrežnu opremu i ostale IT resurse u jednu integrisanu celinu, tako da se njima upravlja kao jednim skupom resursa.
- answer:  Da
- option:  Ne
Q:  U koju kategoriju bi spadao klaud servis podrška odlučivanju:
- answer:  Saas
- option:  BPaaS
- option:  Caas
- option:  laas
- option:  Paas

Q:  Protokol koji omogućava deljenje fajlova između Windows računara naziva se:
- option:  TFTP
- option:  NFS
- option:  SFTP
- option:  Samba
- option:  Nebulos
- answer:  CIFS

Q:  U modelu PaaS za runtime komponentu klaud sistema odgovoran je:
- option:  Klijent
- answer:  Isporučilac usluge

Q:  Kako se naziva fenomen kada je IT infrastruktura u početku mala, a potom raste tako što se dodaju IT resursi kada za to nastane potreba?
- option:  Hyperconverged infrastructure
- option:  Converged Infrastructure
- option:  IT crawl
- answer:  IT sprawl

Q:  NFS protocol za deljenje fajlova je:
- answer:  Siguran protocol koji služi za deljenje fajlova između Linux klijenata.                              - option:  Industrijski standard za transfer fajlova putem šifrovanog kanala.                                                   - option:  Siguran protocol koji služi za deljenje fajlova između Windows računara. 	                   - option:  Industrijski standard za transfer fajlova u formi otvorenog (eng. “plain”) teksta.

Q:  Kategorizacija koja opisuje dimenzije I oblik računara, uređaja ili računarskih komponenti naziva se:
- answer:  Form factor                                                                                                                          - option:  Tower                                                                                                                                   - option:  Size factor                                                                                                                            - option:  Size fact                                                                                                                               - option:  Factor size                                                                                                                                 - option:  Factor form 

Q:  Koji od sledećih iskaza je tačan:
- answer:  Hub and spoke topologija je slična topologiji zvezde                                                                  - option:  Potpuno zamršena topologija je slična topologiji zvezve                                                                 - option:  Klaud DHCP protocol u pojedinim slučajevima koristi DORA model                                            - option:  Konvegirane tehnologije se najčešće koriste u implementaciji mrežnih komutatora trećeg sloja                                                                                                                                     - option:  Ništa od navedenog nije tačno                                                                                                            - option:  Delimično zamržena topologija se najčešće koristi kod lokalnih mreža

Q:  Prema Gartner- option: u neke od pet glavnih karakteristika klaud računarstva su (označiti 3 uljeza):
- option:  merenje po potrošnji                                                                                                                                       - answer:  korišćenje HTTP protokola                                                                                                                   - answer:  korišćenje internet tehnologija                                                                                                              - option:  dostavljanje resursa na zahtev                                                                                                            - option:  skalabilnost                                                                                                                                                   - answer:  orijentisanost ka virtuelnim mašinama

Q:  Koja od sledećih tvrdnji koja se odnosi na tehnologiju virtualizacije je tačna:
- option:  Operativni system “vidi” grupu fizičkih server kao jedan skup računarskih resursa i više operativnih sistema može paralelno da se izvršava na jednoj fizičkoj mašini (serveru).       - option:  Bez višenitnog izvršavanja tehnologije virtualizacije ne bi bilo moguće                             - option:  Ništa od nevedenog nije tačno                                                                                                         - answer:  Virtualizacija podrazumeva enkapsulaciju I apstrakciju računarskih resursa, kada se oni koriste na način koji odgovara određenoj primeni                                                                    - option:  Jedan od oblasti koju virtuelizacija obuhvata je virtuelizacija izlaznih uređaja
Q:  Koji od sledećih iskaza su tačni (označi 2 odgovora):
- option:  Računarski centar treba da obezbedi asimetričnu optičku konekciju koja će zadovoljiti potrebe za brzim prenosom podataka i pravovremenim obavljanjem svih aktivnosti.                  
- option:  U širokopojasnim mrežama najčešće se koristi topologija zvezva i linkovi                                  - answer:   proxy server koji optimizuju pristup internet tako što keširaju (eng. caching) sadržaj i vrše autorizovanje Web saobraćaja                                                                                                        - option:  Tačan je samo jedan od ponuđenih                                                                                                     - option:  WINS (Windows Internet Naming Service) server koji razrešavaju NetBIOS (Network Basic Input Output System) imena u IP adrese                                                                                       - answer:  Računski centar treba da obezbedi kontrolu okruženja da bi se toplota koju generiše oprema na odgovarajući način rasipala I da bi se oprema hladila do optimalne radne temperature                                                                                                                                   - option:  CIFS je takoše poznat pod nazivom SMBP

Q:  Glavna snaga virtualizacije leži u:
- answer:  Particionisanju                                                                                                                                     - option:  Departicionisanju                                                                                                                                     - option:  Dekonponiciji                                                                                                                                      - option:  Segregaciji                                                                                                                                                - option:  Agregaciji                                                                                                                                                - option:  Kompoziciji

Q:  Neki od modova (opcija) za konfigurisanje timova mrežnih kartica su (označi 2 tačna odgovora)
- option:  Transmit Load Balancing with Failover Protection and Preference Sequence                                                                  - answer:  NFT                                                                                                                                        - answer:  SLB                                                                                                                                                    - option:  Network Fault Tolerance Only with Sequence Order





Q:  Privatni klaud je optimalno rešenje u sledećim situacijama (označiti 2 tačna odgovora):
- option:  kad je potrebno brzo i na zahtev pribaviti računarske resurse za jednokratnu upotrebu      
 - answer:  kada je potrebno da se upravlja životnim ciklusom više aplikacija                                          - option:  kada se razvija i testira jedna izolovana aplikacija                                                                      - option:  kada se razvija troslojna aplikacija Web aplikacija                                                                      - answer:  kada postoje zahtevi u pogledu raspoloživosti računarskih resursa različitim poslovnim jedinicama koje su međusobno izolovane

Q:  U navedenoj listi označiti prednosti IaaS modela (označiti 3 tačna odgovora):
- option:  izbegavanje troškova koji bi nastali kupovinom licenci za korišćenje aplikacija                           - option:  za razliku od SaaS I PaaS modela, klijent je odgovoran za sve aspekte upravljanja                     virtuelnim mašinama                                                                                                               - answer:  focus na rast i razvoj poslovanja                                                                                                        - answer:  laka administracija virtuelnih mašina                                                                                               - answer:  skalabilnost i fleksibilnost                                                                                                             - option:  zavisnost od mreže klaud prvajdera

Q:  Standard 802.11ac podržava frekvenciju:
- option:  2.4MHz                                                                                                                                       - option:  5MHz i 2.4MHz                                                                                                                               - answer:  5MHz

Q:  Za označavanje javne komutabilne telefonske mreže koristi se sledeći akronim:
- option:  L2TP                                                                                                                                                    - option:  P2TN                                                                                                                                             - option:  Mesh system                                                                                                                                                           - option:  PBX                                                                                                                                                          - option:  MXS                                                                                                                                     - answer:  PSTN



Q:  U literature se za politiku “ponesi sopstveni uređak” koristi akronim:
- option:  BD                                                                                                                                             - option:  TYOD                                                                                                                                              - answer:  BYOD                                                                                                                                               - option:  BYD                                                                                                                                         - option:  BDOYO                                                                                                                                                          - option:  TYDO

Q:  Šta od navedenog ne spade u oblasti virtualizacije (izbaciti 2 uljeza):
- answer:  Virtuelizacija procesora                                                                                                                 - option:  Virtuelizacija mreže                                                                                                            - option:  Virtuelizacija server                                                                                                              - answer:  Virtuelizacija diska

Q:  Koje su od sledećih tvrdnji tačne (označi 2 tačna odgovora):
- option:  Infrastruktura javnog klauda je u vlasništvu poslovne, vladine ili akademske organizacije koje su potpuno odgovorne za njegovu sigurnost i bezbednost.                                                       - option:  Jedan od najvećih nedostataka privatnog klauda je nepostojanje striktnih protokola za upravljanje podacima                                                                                                                      - answer:  Ako se posmatra iz perspective privatnih (ličnih) korisnika klaud usluga, javni klaud predstavlja primenu koncepta spoljneg snabdevanja                                                                 - answer:  Modeli javnog klauda najviše se koriste za hostovanje razvojnih platform za obradu velike količine podataka i za kompanije koje nemaju visoke standard po pitanju sigurnosti i bezbednosti podataka i sistema.                                                                                               - option:  Jedna od najvećih prednosti privatnog klauda je troškovna efikasnost.







Q:  Neke od prednosti koje omogućava primena SaaS su sledeće (označiti 3 uljeza):
- answer:  slaba kontrola nad razvojem, nadogradnjom i testiranjem aplikacija                                         - option:  potpuna kontrola nad virtuelnim mašinama                                                                        - option:  izbegavanje troškova koji bi nastali kupovinom licenci za korišćenje aplikacija                           - option:  brz razvoj, jer se softwer obezbeđuje na zahtev                                                                     - answer:  klijent nema kontrolu nad sistemom koji obrađuje i skladišti njegove podatke                        - option:  optimalna upotreba raspoloživih računarskih resursa                                                          - option:  eliminacija vremena, utrošene energije i troškova koji bi nastali na osnovu implementacije i održavanja svih ovih servisa

Q:  Promena na Klijent/Server računarstvo je nastala:
- option:  2000                                                                                                                                           - option:  1970 
- answer:  1980 
- option:  1990

Q:  Hibridni klaud je optimalan izbor u sledećim situacijama (označiti 2 tačna odgovora):
- option:  kada se razvija i testira jedna izolovana aplikacija
- answer:  kada često dolazi do fenomena tzv. pucanja klauda
- answer:  kada postoje zahtevi za „trajnim” računarskim resursima koji se na klaudu koriste
- option:  kada je potrebno da se upravlja životnim ciklusom više aplikacija
- option:  kada se razvija troslojna aplikacija

Q:  Koja od sledećih tvrdnji koja se odnosi na tehnologiju virtuelizacije je tačna:
- option:  Jedna od oblasti koju virutelizacija obuhvata je virtuelizacija izlaznih uredaja
- answer:  Virtuelizacija podrazumeva enkapsulaciju i apstrakciju računarskih resursa, kada se oni koriste na način koji odgovara određenoj primeni
- option:  Ništa od navedenog nije tačno
- option:  Operativni sistem vidi" grupu fizičkih servera kao jedan skup računarskih resursa i više operativnih sistema može paralelno da se izvršava na jednoj fizičkoj mašini (serveru).
- option:  Bez višenitnog izvršavanja tehnologija virtuelizacije ne bi bila moguća


Q:  Za uslugu Daas koristi se i naziv:
- option:  xAAs
- answer:  VDI
- option:  SDN
- option:  SDDC
- option:  PDI
- option:  BPaaS
- option:  NLB

Q:  Ako se posmatra fizička lokacija računskog centra (da li se računski centar nalazi u prostorijama kompanije, ili na nekoj drugoj lokaciji), računski centar može da bude organizovan u nekoj od sledećih formi (izbaciti 3 uljeza):
- answer:  deljeno hostovanje
- answer:  modeli klaud računarstva
- option:  namensko hostovanje
- option:  kolokacioni klaud centar
- answer:  hostovanje kojim se upravlja
- option:  računski centar kojim se upravlja

Q:  Neke od neefikasnosti koje su prouzrokovane fenomenom IT bujanja su sledeće (označiti tri odgovora): 
- answer:  nedovoljno korišćenje resursa
- option:  neelastičnost TCO indikatora
- option:  neefikasnost PBX sistema
- answer:  preveliko opterećenje menadžmenta u donošenju upravljačkih odluka vezanih za korišćenje resursa
- option:  kupovina loših napajanja računarske opreme
- option:  nemogućnost implementiranja hipervizora
- answer:  veći zahtevi za sistemima za hladenje opreme

Q:  WINS servis se koristi za razrešavanje imena računara u IP adrese:
- option:  NETAČNO
- answer:  TAČNO

Q:  Mainframe račuanar koji se smatra za prvu instancu virtuelizacije ima naziv: 
- option:  F10
- answer:  CP- 40
- option:  CP- 45
- option:  OpenNebula
- option:  ENIAC

Q:  Standard 1000BaseT za bakami kabl koristi sledeće katorije kablova (označiti 2 odgovora):
- answer:  Cat 5e
- option:  Cat 2e
- option:  Cat 3
- option:  Cat 5
- option:  Cat 6e
- option:  Cat 3e
- option:  Cat 7
- answer:  Cat 6

Q:  Šta označava akronim TCO?
- option:  Total Cost of Operations
- option:  Total Capacity of Operations
- option:  Total Capacity of Ownership
- answer:  Total Cost of Ownership

Q:  Da li je sledeća tvrdnja tačna? HP usluge implementacije konvergirane infrastrukture (eng. "HP Converged Infrastructure Implementation Services") omogućavaju klijentima da delimično implementiraju, integriŝu i optimizuju konvergiranu infrastrukturu pomoću HP konvergiranih sistema (eng. HP Converged Systems).
- option:  Ne
- answer:  Da
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