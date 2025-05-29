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
const quizData = parseQuizQuestions(`Q: U Springu se ne koristi kontejner koji je zadužen za instanciranje zrna.
- option: Da
- answer: Ne
- explanation: Ova tvrdnja je netačna. U Spring okruženju, kontejner (ApplicationContext ili BeanFactory) je upravo zadužen za instanciranje, konfigurisanje i upravljanje zrnima. Spring IoC (Inversion of Control) kontejner se brine o kreiranju objekata, povezivanju njihovih zavisnosti, konfigurisanju i upravljanju njihovim kompletnim životnim ciklusom.

Q: Da bi se Spring konfigurisao za automatsko otkrivanje zrna potrebno je koristiti element:
- option: <context:annotation-config>
- answer: <context:component-scan>
- explanation: Element <context:component-scan> se koristi za automatsko otkrivanje zrna u Springu. Za razliku od <context:annotation-config> koji samo omogućava konfiguraciju putem anotacija, <context:component-scan> ide korak dalje tako što pretražuje određene pakete i automatski otkriva i registruje Spring zrna. To znači da može pronaći i kreirati zrna označena stereotipskim anotacijama poput @Component, @Service, @Repository, itd.

Q: Engl. heap - mesto u memoriji gde se smeštaju objekti označava:
- option: Kada ostane poslednja referenca na određeni objekat
- answer: Kada se zrno više ne koristi
- option: Kada ostane samo jedna referenca ka objektu
- answer: Kada se ukine poslednja referenca na određeni objekat
- explanation: U kontekstu upravljanja memorijom u Javi, objekat postaje podoban za sakupljanje đubreta (garbage collection) kada više ne postoje reference koje pokazuju na njega. To znači da objekat više nije dostižan ili upotrebljiv u aplikaciji. Kada se ukloni poslednja referenca na objekat ili ona izađe iz opsega, objekat postaje kandidat za sakupljanje đubreta, a memorija heap može biti oslobođena od strane Java Virtuelne Mašine (JVM).

Q: Automatsko ožičavanje byType - po tipu odnosi se na to da:
- answer: Spring pokušava da upari određena polja automatski ožičenog zrna sa zrnima čiji se tip može dodeliti polju. Polja za koje nije pronađeno zrno koje može da se upari ostaju neožičena.
- option: Spring pokušava da upari sva polja automatski ožičenog zrna sa zrnima čiji se tip može dodeliti polju. Polja za koje nije pronađeno zrno koje može da se upari ostaju neožičena.
- option: Spring pokušava da upari sva polja automatski ožičenog zrna sa zrnima čiji se tip može dodeliti polju. Polja za koje nije pronađeno zrno koje može da se upari dodejljuje se opštim zrnima.

Q: Šta je POJO?
- answer: Plain Old Java Object
- option: Pure Oriented Java Object
- option: Pretty Ordinary Java Object
- option: Polimorphic Java Object
- explanation: POJO (Plain Old Java Object) je termin koji označava običan Java objekat koji nema specijalne ograničenja, zavisan od nekog specifičnog okvira ili interfejsa. To je jednostavna Java klasa koja ima privatne promenljive i javne get/set metode, bez dodatnih komplikacija. POJO objekti su laki za testiranje, čitanje i pisanje, te se često koriste u Spring i ostalim Java okvirima.

Q: Injekcija zavisnosti (DI) se upotrebljava svaki put kada se razvijaju aplikacije bazirane na Spring okviru.
- option: Ne
- answer: Da
- explanation: Injekcija zavisnosti (Dependency Injection) je ključni princip Spring framework-a. Ona omogućava da se zavisnosti između komponenti automatski upravljaju od strane Spring kontejnera, umesto da ih sami objekti eksplicitno kreiraju. Ovo smanjuje spregu između komponenti, čini kod fleksibilnijim, lakšim za testiranje i održavanje.

Q: Kako se definiše labava sprega (loose coupling)?
- answer: način povezivanja komponenti tako da minimalno zavise jedna od druge
- option: način povezivanja komponenti tako da su one čvrsto povezane jedne sa drugima
- option: način povezivanja komponenti tako da su komponente u potpunosti nezavisne jedne od drugih
- explanation: Labava sprega (loose coupling) je princip dizajniranja softverskih sistema gde komponente imaju minimalne međuzavisnosti. Ovo se postiže korišćenjem interfejsa, dependency injection i drugih tehnika koje omogućavaju da komponente budu što je moguće nezavisnije. Prednosti uključuju lakše testiranje, održavanje i mogućnost zamene komponenti bez velikih promena u sistemu.

Q: Postupak kreiranja veza i zavisnosti između komponenti aplikacije naziva se:
- option: Injekcija zavisnosti, odnosno engl. dependency injection
- answer: Ožičavanje ili povezivanje, odnosno engl. wiring
- explanation: Wiring (ožičavanje) je proces uspostavljanja zavisnosti između komponenti u aplikaciji. U Spring kontekstu, to znači povezivanje objekata tako što se jednom objektu dodeljuju reference na druge objekte koje su mu potrebne. Ovo se može postići ručno kroz XML konfiguraciju, anotacijama ili automatskim otkrivanjem zavisnosti.

Q: Automatsko ožičavanje constructor - po konstruktoru odnosi se na to da:
- option: Spring pokušava da upari konstruktor automatski ožičenog zrna sa zrnima čiji se tipovi ne mogu dodeliti argumentima konstruktora.
- answer: Spring pokušava da upari konstruktor automatski ožičenog zrna sa zrnima čiji se tipovi mogu dodeliti argumentima konstruktora.
- explanation: Automatsko ožičavanje po konstruktoru znači da Spring pokušava da pronađe i injektuje zavisnosti koje odgovaraju parametrima konstruktora. Ako postoji više bean-ova koji odgovaraju tipu parametra, Spring će pokušati da pronađe najpogodniji, ili će izbaciti izuzetak ako ne može jednoznačno da odredi koji bean treba da se injektuje.

Q: Kao rezultat AOP-a, komponente više nemaju dodatni kod koji se bavi na primer logovanjem, već se mogu fokusirati na svoju glavnu funkconalnost.
- answer: Da
- option: Ne
- explanation: Aspektno orijentisano programiranje (AOP) omogućava odvajanje cross-cutting concerns (poput logovanja, sigurnosti, transakcija) od osnovne poslovne logike. Ovo znači da komponente mogu da se fokusiraju isključivo na svoju primarnu funkcionalnost, dok se dodatne, horizontalne funkcionalnosti implementiraju kroz aspekte, čime se postiže čistiji i modularnije dizajniran kod.

Q: U programiranju se često dešava da je potrebno pisati isti kod više puta. Ovakav kod se naziva:
- option: na engl. before advice kod.
- answer: na engl. boilerplate kod.
- option: na engl. pointcut kod.
- option: na engl. after advice kod.
- option: ništa od navedenog
- explanation: Boilerplate kod predstavlja delove koda koji se ponavljaju u više različitih delova programa, a koji imaju malo ili nimalo varijacija. To su standardni, često rutinski segmenti koda koji moraju biti uključeni u više mesta, poput getter/setter metoda, inicijalizacionog koda, ili standardnih try-catch blokova.

Q: @Service stereotipna anotacija je:
- option: anotacija opšte namene koja nagoveštava da je klasa koja je označena na ovaj način Spring komponenta.
- option: anotacija koja označava da je klasa repozitorijum podataka.
- answer: anotacija koja označava da klasa definiše servis.
- option: anotacija koja specificira da klasa definiše Spring MVC kontroler.
- explanation: @Service anotacija se koristi za označavanje servisa u Spring aplikacijama. Servisi sadrže poslovnu logiku i predstavljaju srednji sloj između kontrolera i repozitorijuma. Ova anotacija je specijalizovana verzija @Component anotacije, koja Spring kontejneru govori da tretira datu klasu kao servisni bean.

Q: Koji je način rada Request opseg zrna u Springu?
- answer: Opseg važenja zrna je jedan HTTP zahtev. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- option: Opseg zrna je jedna instança po kontejneru (podrazumevano)
- option: Opseg važenja je jedna HT sesija. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- option: Dozvoljava više instanciranja zrna
- explanation: Request opseg znači da se za svaki HTTP zahtev kreira nova instanca bean-a. Svaki put kada se napravi novi HTTP zahtev, Spring će kreirati novi objekat za taj specifični zahtev. Ovo je korisno u web aplikacijama gde želimo da imamo različite instance za svaki dolazni zahtev, na primer za čuvanje privremenih podataka specifičnih za taj zahtev.

Q: Pozivom metode getBean() se:
- answer: dobija samo referenca na zrno koje je već kreirano i postoji u kontejneru.
- option: dobija samo referenca na zrno koje se kreira i postavlja u kontejer.
- option: ne dobija referenca na zrno, već se kreira i postavlja u kontejner.
- explanation: Metoda getBean() vraća postojeću instancu bean-a iz Spring kontejnera. Ako bean još nije kreiran, Spring će ga inicijalizovati pre vraćanja reference. Međutim, metoda ne kreira novi bean svaki put kada se pozove - vraća postojeći bean ili inicijalizuje novi ako ne postoji.

Q: Atribut base-package služi za:
- option: primanje paketa od kog počinje pretraga.
- option: zadavanje paketa od kog zavisi pretraga.
- option: primanje paketa od kog zavisi pretraga.
- answer: zadavanje paketa od kojeg počinje pretraga.
- explanation: Atribut base-package se koristi u Spring konfiguraciji za definisanje početnog paketa od kojeg će Spring vršiti pretragu komponenti za automatsko otkrivanje i registrovanje zrna. Ovo omogućava efikasno skeniranje određenog dela projekta za Spring komponentama.

Q: Spring neće pokušati da pretopstavi koje zrno da ožiči u konstruktoru ako pronađe više zrna koja odgovaraju argumentima konstuktora. Ukoliko dođe to takve situacije, Spring će pokušati da uradi automatsko ožičavanje:
- answer: po imenu
- option: po tipu
- option: po konstruktoru
- explanation: Kada postoji više zrna koja odgovaraju tipu argumenta konstruktora, Spring će pokušati da pronađe zrno čije ime odgovara imenu parametra. Ovo je strategija za razrešavanje konflikta kada postoji više potencijalnih kandidata za injektovanje.

Q: Kojom naredbom se postiže učitavanje konteksta iz xml fajla pod imenom zrna.xml?
- option: ApplicationContext context = (Context) Environmet.getXMLClassPath("zrna.xml");
- answer: ApplicationContext context = new ClassPathXmlApplicationContext("zrna.xml");
- option: ApplicationContext context = context.getFilePath("zrna.xml");
- explanation: ClassPathXmlApplicationContext je Spring klasa koja učitava XML konfiguraciju sa klasne putanje (classpath). Ova metoda se koristi kada se XML konfiguracioni fajl nalazi u direktorijumu resursa projekta, omogućavajući jednostavno učitavanje Spring konteksta iz XML fajla.

Q: U slučaju primene DI:
- answer: objektima se dodeljuju zavisnosti za vreme njihovog kreiranja
- option: jedan objekat bi bio zadužen da dobavi reference na objekte sa kojima sarađuje.
- explanation: Dependency Injection (DI) princip podrazumeva da se zavisnosti objekta dodeljuju u trenutku njegovog kreiranja, umesto da objekat sam kreira ili pronalazi svoje zavisnosti. Ovo se najčešće postiže kroz konstruktor, setter metode ili direktno injektovanje polja, čime se postiže veća fleksibilnost i lakše testiranje.

Q: Sledeći deo koda predstavlja izbegavanje: @Autowired(required=false) private KonzolniPisac konzоlniPisac;
- answer: izuzetaka (eng. Exception) prilikom ožičavanja 
- option: NullPointerException prilikom ožičavanja
- explanation: Anotacija @Autowired(required=false) govori Spring-u da nije obavezno injektovati zavisnost. Ako odgovarajući bean nije pronađen, umesto da baci izuzetak, Spring će postaviti polje na null. Ovo pomaže da se izbegnu izuzeci u slučajevima gde neka zavisnost nije obavezna za funkcionisanje komponente.

Q: Labava sprega (engl. loose coupling) je termin koji se pre svega odnosi na pristup povezivanju komponenti nekog sistema na takav način da te komponente:
- answer: minimalno zavise jedna od druge
- option: zavise jedna od druge
- option: ne zavise jedna od druge
- explanation: Labava sprega (loose coupling) predstavlja dizajn sistema gde komponente imaju minimalne međuzavisnosti. Ovo omogućava veću fleksibilnost, lakše testiranje i održavanje, jer promene u jednoj komponenti imaju minimalan uticaj na druge komponente sistema.

Q: Ukoliko želimo da promenimo način rada nekog od ovih servisa, potrebno je:
- answer: izmeniti kod u više komponenti.
- option: izmeniti kod u konfiguracionom fajlu.
- option: izmeniti kod u svim kompelmentama.
- option: izmeniti kod u jednoj komponenti.
- explanation: Kada je arhitektura sistema čvrsto spregnuta, izmena jednog servisa zahteva promenu u više komponenti. Ovo ukazuje na nedostatak fleksibilnosti i kršenje principa single responsibility, gde promene u jednoj komponenti imaju širok uticaj na druge delove sistema.

Q: Elementi <list> i <set> :
- option: odgovaraju kolekcijama koje su tipa java.util.Map i java.util.Properties, respektivno.
- answer: su korisni za konfigurisanje polja neke klase koja su ili nizovi ili bilo koja implementacija interfejsa java.util.Collection.
- explanation: U Spring XML konfiguraciji, elementi <list> i <set> služe za definisanje kolekcija. <list> dozvoljava duplikate i čuva redosled elemenata, dok <set> ne dozvoljava duplikate. Oba elementa se koriste za konfigurisanje polja klase koja implementira Java kolekcije.

Q: Elementi <map> i <props> :
- answer: odgovaraju kolekcijama koje su tipa java.util.Map i java.util.Properties, respektivno.
- option: su korisni za konfigurisanje polja neke klase koja su ili nizovi ili bilo koja implementacija interfejsa java.util.Collection.
- explanation: <map> element se koristi za definisanje Java Map kolekcije gde svaki element ima ključ i vrednost, dok <props> element specifično definiše Java Properties kolekciju koja čuva parove String ključeva i vrednosti.

Q: Opcija za automatsko ožičavanje (engl. autowiring) omogućava:
- answer: Springu se dozvoljava da automatski odluči kako da ožiči zrna.
- option: Springu se ne dozvoljava da automatski odluči kako da ožiči zrna.
- answer: redukovanje u velikoj meri upotrebe <constructor-arg>  i <property> elemenata ili eliminaciju u potpunosti
- option: redukovanje u umerenoj meri upotrebe <constructor-arg>  i <property> elemenata ili delimičnu eliminaciju
- explanation: Automatsko ožičavanje u Springu omogućava kontejneru da samostalno pronalazi i injektuje zavisnosti između komponenti. Ovo značajno smanjuje potrebu za eksplicitnom konfiguracijom svakog bean-a, čineći konfiguraciju jednostavnijom i čišćom.

Q: @Controller stereotipna anotacija je:
- answer: anotacija koja specificira da klasa definiše Spring MVC kontroler.
- option: anotacija koja označava da je klasa repozitorijum podataka.
- option: anotacija opšte namene koja nagoveštava da je klasa koja je označena na ovaj način Spring komponenta.
- option: anotacija koja označava da klasa definiše servis.
- explanation: @Controller anotacija se koristi za označavanje klasa koje predstavljaju kontrolere u Spring MVC arhitekturi. Ove klase su odgovorne za obradu HTTP zahteva, pripremu modela i izbor odgovarajućeg prikaza (view).

Q: Atribut required se može koristiti na bilo kom mestu gde se može staviti i anotacija @Autowired.
- answer: Da
- option: Ne
- explanation: Atribut required omogućava fleksibilnost pri injektovanju zavisnosti. Kada je postavljeno na false, Spring neće bacati izuzetak ako odgovarajući bean nije pronađen, već će polje ostati null. Ovo je korisno za opcione zavisnosti koje nisu kritične za funkcionisanje komponente.

Q: Koje reference je potrebno dodati u Maven projekat za osnovni Spring projekat?
- option: spring-bean
- answer: spring-beans
- answer: spring-context
- answer: spring-core
- option: spring-contexts
- option: spring-cores
- explanation: Za osnovni Spring projekat, ključne Maven zavisnosti uključuju spring-beans (za definiciju i upravljanje bean-ovima), spring-context (za kontekst aplikacije) i spring-core (za osnovne Spring funkcionalnosti).

Q: Kontejneri u Springu zbog primene inverzije kontrole se ne označavaju terminom IoC kontejneri.
- option: Da
- answer: Ne
- explanation: IoC (Inversion of Control) kontejneri su upravo suština Spring framework-a. Umesto da objekti sami kontrolišu svoje zavisnosti, kontejner preuzima odgovornost za kreiranje, konfiguraciju i upravljanje objektima.

Q: Kako treba da bude anotiran savet aspekta koji će se izvršiti isključivo kada ciljana metoda izbaci izuzetak?
- answer: @AfterThrowing
- option: @Around
- option: @AfterReturning
- option: @Exception
- explanation: @AfterThrowing anotacija se koristi za definisanje aspekta koji se izvršava samo kada ciljana metoda izbaci izuzetak. Ovo omogućava centralizovano upravljanje izuzecima ili logovanje grešaka bez mešanja tog koda u poslovnu logiku metode.

Q: Aspektno orijentisano programiranje (AOP) se koristi za:
- option: izdvajanje funkionalnosti koju je nepotrebno koristiti.
- option: izdvajanje funkionalnosti koju je potrebno koristiti za pokretanje aplikacije.
- answer: izdvajanje funkionalnosti koju je potrebno koristiti kroz celu aplikaciju.
- option: izdvajanje funkionalnosti koju je potrebno koristiti za deo aplikacije.
- explanation: AOP omogućava izdvajanje cross-cutting concerns (poput logovanja, sigurnosti, transakcija) koje se primenjuju kroz više delova aplikacije, čime se postiže bolja modularnost i razdvajanje odgovornosti.

Q: Kada Spring samostalno odlučuje koje klase treba da se konfigurišu kao Spring zrna, čime se dodatno umanjuje i potreba za <bean> elementima se naziva:
- answer: automatsko otkrivanje zrna (engl. autodiscovery)
- option: automatsko ožičavanje zrna (engl. autowiring)
- explanation: Automatsko otkrivanje zrna (autodiscovery) je mehanizam gde Spring sam pronalazi i registruje komponente koje treba da budu Spring bean-ovi, najčešće korišćenjem anotacija poput @Component, @Service, @Repository.

Q: Koja je razlika između <list> i <set> elemenata za konfiguraciju polja?
- option: <list> ne dozvoljava duplikate, <set> da
- answer: <list> dozvoljava duplikate, <set> ne
- option: nema nikakve razlike između pomenutih elemenata
- explanation: <list> element u Spring XML konfiguraciji dozvoljava duplikate i čuva redosled elemenata, dok <set> element ne dozvoljava duplikate, što odgovara ponašanju Java List i Set kolekcija.

Q: Kompletna Spring konfiguracija se smešta unutar:
- option: <bean> tagova
- option: Ništa od navedenog
- answer: <beans> tagova
- explanation: <beans> tag je root element XML Spring konfiguracionog fajla koji sadrži kompletan skup bean definicija i drugih Spring konfiguracionih elemenata.

Q: Kontejner je zadužen za kreiranje objekata, njihovo međusobno ožičavanje, njihovu konfiguraciju, odnosno upravljanje njihovim kompletnim životnim.
- answer: Da
- option: Ne
- explanation: Ovo je tačna definicija Spring IoC kontejnera. On preuzima potpunu odgovornost za životni ciklus objekata - od njihovog kreiranja, konfigurisanja, injektovanja zavisnosti, pa do njihovog uklanjanja.

Q: Spring nudi nekoliko načina automatskog ožičavanja:
- option: byValue
- answer: byType
- answer: byName
- answer: constructor
- explanation: Spring podržava različite strategije automatskog ožičavanja: byType (pronalaženje bean-ova po tipu), byName (pronalaženje bean-ova po imenu), i constructor (injektovanje zavisnosti kroz konstruktor).

Q: Injekcija polja (engl. Property Injection) izvršava se kroz:
- option: insert metode
- option: get metode
- answer: set metode
- option: inject metode
- option: getBean metode
- option: execute metode
- explanation: Property Injection se tradicionalno vrši kroz set metode (setter metode), gde se zavisnosti injektuju pozivom odgovarajućih setter metoda nakon inicijalizacije objekta.

Q: Izvor podataka u radu sa bazom se definiše zrnom koje je tipa:
- answer: DataSource
- option: JdbcTemplate
- option: Database
- option: ORMSource
- explanation: DataSource je standardni interfejs u Javi koji apstrahuje konfiguraciju konekcije prema bazi podataka. U Spring aplikacijama, DataSource bean omogućava centralizovano upravljanje parametrima konekcije, kao što su URL baze, korisničko ime, lozinka, maksimalan broj konekcija, itd.

Q: AOP modul predstavlja osnovu za razvoj aspekata u Spring aplikaciji.
- answer: Da
- option: Ne
- explanation: AOP (Aspect-Oriented Programming) modul je ključan za implementaciju aspekata u Spring aplikacijama. Omogućava razdvajanje cross-cutting concerns (poput logovanja, sigurnosti, transakcija) od osnovne poslovne logike, čime se postiže bolja modularnost koda.

Q: <list> tip konfiguracionih elemenata koji odgovaraju kolekcijama se koristi za:
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde su i ime i vrednost tipa String
- option: Ožičavanje skupa vrednosti, duplikati nisu dozvoljeni
- answer: Ožičavanje liste vrednosti, duplikati su dozvoljeni
- option: Ožičavanje skupa vrednosti, duplikati su dozvoljeni
- option: Ožičavanje liste vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde ime i vrednost mogu biti bilo kog tipa
- explanation: <list> element u Spring XML konfiguraciji služi za definisanje liste gde su duplikati dozvoljeni. Ovo odgovara ponašanju Java List kolekcije, gde možete imati iste vrednosti više puta i zadržati redosled elemenata.

Q: Spring je sistem za organizaciju Java koda, upotrebom:
- option: XHTML fajlova ili anotacija
- answer: XML fajlova ili anotacija
- option: XTML fajlova ili anotacija
- option: HTML fajlova ili anotacija
- explanation: Spring omogućava konfiguraciju Java aplikacija kroz XML fajlove ili anotacije. XML konfiguracija pruža eksplicitnu konfiguraciju bean-ova, dok anotacije omogućavaju brže i jednostavnije definisanje komponenti direktno u izvornom kodu.

Q: Nakon dodavanja ovog elementa u beans.xml fajl:
- option: nije moguće koristiti anotacije za automatsko ožičavanje unutar Java klasa, umesto konfigurisanja unutar beans.xml.
- answer: moguće je koristiti anotacije za automatsko ožičavanje unutar Java klasa, umesto konfigurisanja unutar beans.xml
- explanation: Dodavanjem odgovarajućeg elementa (poput <context:annotation-config> ili <context:component-scan>), Spring omogućava upotrebu anotacija za automatsko otkrivanje i konfigurisanje bean-ova, čime se značajno pojednostavljuje konfiguracija aplikacije.

Q: Aspekti osiguravaju da POJO ostanu čisti i jednostavni.
- option: Ne
- answer: Da
- explanation: Aspekti omogućavaju da POJO (Plain Old Java Object) klase ostanu fokusirane na svoju primarnu poslovnu logiku. Cross-cutting concerns poput logovanja, sigurnosti ili transakcija se implementiraju kroz aspekte, čime se izbegava mešanje različitih odgovornosti unutar osnovnih klasa.

Q: Koji je način rada Session opseg zrna u Springu?
- option: Opseg važenja zrna je jedan HTTP zahtev. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- option: Opseg zrna je jedna instanca po kontejneru (podrazumevano)
- option: Dozvoljava više instanciranja zrna
- answer: Opseg važenja je jedna HTTP sesija. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- explanation: Session opseg znači da se za svaku HTTP sesiju kreira nova instanca bean-a. Ovo je korisno u web aplikacijama gde želimo da čuvamo stanje koje je specifično za jednog korisnika tokom njegove sesije.

Q: Učitavanje konteksta aplikacije iz sistema fajlova se koristi na sledeći način:
- option: Ništa od navedenog.
- answer: ApplicationContext context = new FileSystemXmlApplicationContext("C:/vitez.xml");
- option: ApplicationContext context = new ClassPathXmlApplicationContext("vitez.xml");
- option: ApplicationContext context = new ClassPathXmlApplicationContext("C:/vitez.xml");
- option: ApplicationContext context = new FileSystemXmlApplicationContext("vitez.xml");
- explanation: FileSystemXmlApplicationContext se koristi kada želimo da učitamo Spring konfiguraciju iz specifične putanje na fajl sistemu. Ovo je korisno kada XML konfiguracioni fajl nije deo klasne putanje, već se nalazi na određenoj lokaciji na disku.

Q: U okviru Spring okruženja, od objekata se:
- answer: ne očekuje da traže ili kreiraju druge objekte koji su im potrebni kako bi obavljali svoju funkciju.
- option: zahteva da traže ili kreiraju druge objekte koji su im potrebni kako bi obavljali svoju funkciju.
- option: očekuje da traže ili kreiraju druge objekte koji su im potrebni kako bi obavljali svoju funkciju.
- explanation: Ovo je suština Inversion of Control (IoC) principa. Objekti ne snose odgovornost za kreiranje ili pronalaženje svojih zavisnosti, već ih dobijaju kroz dependency injection od strane Spring kontejnera.

Q: @Autowired anotacija radi po principu automatskog ožičavanja:
- answer: po tipu
- option: po konstruktoru
- option: po imenu
- explanation: @Autowired anotacija po podrazumevanom ponašanju vrši injektovanje zavisnosti po tipu. Spring pokušava da pronađe bean čiji tip odgovara tipu polja ili parametra konstruktora gde se anotacija koristi.

Q: Automatsko ožičavanje po konstruktoru se prvo pokušava:
- option: po konstruktoru
- option: po imenu
- answer: po tipu
- explanation: Kada se koristi automatsko ožičavanje po konstruktoru, Spring prvo pokušava da pronađe bean-ove koji odgovaraju tipu parametara konstruktora. Tek ako postoji više mogućih kandidata, prelazi na druge strategije razrešavanja zavisnosti.

Q: U Spring okruženju sva zrna su podrazumevano:
- option: Prototype
- option: Scope
- option: Session
- answer: Singleton
- option: Ništa od navedenog
- explanation: Singleton opseg je podrazumevani opseg za Spring bean-ove. To znači da se za svaki bean kreira samo jedna instanca koja se deli između svih komponenti koje zahtevaju taj bean.

Q: Kada se radi ožičavanje po tipu dozvoljeno je:
- option: imati više zrna koja se mogu dodeliti u neko polje automatski ožičenog zrna.
- option: nemati ni jedno zrno koje se može dodeliti u neko polje automatski ožičenog zrna.
- answer: imati samo jedno zrno koje se može dodeliti u neko polje automatski ožičenog zrna
- explanation: Kod automatskog ožičavanja po tipu, Spring zahteva da postoji tačno jedna instanca bean-a odgovarajućeg tipa. Ukoliko postoji više bean-ova istog tipa, Spring će baciti izuzetak jer ne može jednoznačno odrediti koji bean treba da se injektuje.

Q: Komponente primenom aspekata su:
- option: potpuno upućene u to koji sistemski servisi utiču na njih.
- option: delimično upućene u to koji sistemski servisi utiču na njih.
- answer: potpuno neupućene u to koji sistemski servisi utiču na njih.
- explanation: Jedna od ključnih prednosti AOP-a je da komponente ne znaju za sistemske servise koji ih okružuju. Aspekti se dodaju transparentno, bez menjanja osnovnog koda komponente, čime se postiže bolja modularnost i razdvajanje odgovornosti.

Q: Zrno se referencira iz:
- option: <aop:pointcut>
- option: <aop:config>
- option: <aop:before>
- answer: <aop:aspect>
- option: <aop:around>
- explanation: U Spring AOP konfiguraciji, <aop:aspect> element se koristi za definisanje aspekta i referisanje zrna koje implementira aspekt. Ovaj element objedinjuje definiciju saveta (advice) i tačke preseka (pointcut).

Q: Koja se anotacija koristi za definisanje tačke preseka (pointcut)?
- answer: @Pointcut
- option: nijedan od navedenih
- option: @PointcutExecution
- option: @JoinPoint
- explanation: @Pointcut anotacija se koristi za definisanje tačke preseka u AspectJ/Spring AOP. Ona označava mesto u kodu gde će aspekt biti primenjen, omogućavajući precizno definisanje gde će se dodatna funkcionalnost izvršiti.

Q: Core Container Spring modul sadrži:
- answer: Beans
- answer: Context
- answer: Core
- option: ORM
- option: Web
- option: WebSocket
- option: Servlet
- answer: SpEL
- option: JDBC
- explanation: Core Container je centralni modul Spring framework-a koji uključuje Beans (za upravljanje bean-ovima), Context (za kontekst aplikacije), Core (osnovne funkcionalnosti) i SpEL (Spring Expression Language) komponente.

Q: Zrna se kreiraju uz pomoć metapodataka koji se prosleđuju kontejneru u obliku:
- option: <beans><beans/> tagova
- option: HTML fajla
- option: XHTML fajla
- answer: <bean> <bean/> tagova
- option: XTML fajla
- answer: XML fajla
- explanation: U Spring konfiguraciji, bean-ovi se definišu kroz XML fajlove koristeći <bean> tagove, koji pružaju metapodatke kontejneru o tome kako da kreira i konfiguriše objekte.

Q: Core container:
- option: ovim modulom dodaje se sloj razumljivih izuzetaka iznad izuzetaka koje izbacuju različite baze podataka, čime se uprošćava rukovanje izuzecima.
- answer: je centralni deo koji određuje kako se zrna kreiraju, konfigurišu i zadužen je za upravljanje njima.
- option: često rezultuje gomilom viška koda, poput dohvatanja konekcije, pripreme upita, izvršavanja upita, obrade rezultata i zatvaranja konekcije.
- explanation: Core container je ključni deo Spring framework-a koji upravlja životnim ciklusom bean-ova, njihovim kreiranjem, konfiguracijom i međusobnim povezivanjem kroz mehanizam dependency injection.

Q: Modul Testing:
- option: Ovaj modul daje podršku za dodavanje agenata Java virtuelnoj mašini.
- answer: ima podršku za integraciono testiranje, kroz učitavanje različitih kolekcija zrna u kontekst aplikacije.
- explanation: Spring Testing modul olakšava pisanje integracijskih testova, omogućavajući jednostavno učitavanje Spring konteksta i testiranje komponenti u okruženju sličnom produkcijskom.

Q: @Component stereotipna anotacija je:
- option: anotacija koja označava da klasa definiše servis.
- option: anotacija koja označava da je klasa repozitorijum podataka.
- option: anotacija koja specificira da klasa definiše Spring MVC kontroler.
- answer: anotacija opšte namene koja nagoveštava da je klasa koja je označena na ovaj način Spring komponenta.
- explanation: @Component je generička anotacija koja označava da je klasa Spring komponenta. Ostale stereotipske anotacije poput @Service, @Repository i @Controller su specijalizacije @Component anotacije.

Q: Šta je Maven i zbog čega se intenzivno koristi u razvoju Java aplikacija?
- option: Maven je klasa koja se koristi za pokretanje aplikacije.
- option: Maven je plugin koji se koristi za pisanje koda
- answer: Maven je alat koji se koristi za build i rukovodjenje bilo kojim Java projektom.
- explanation: Maven je moćan alat za upravljanje Java projektima koji automatizuje build proces, zavislosti, testiranje i deployment. Omogućava jednostavno upravljanje projektnim zavisnostima i standardizuje strukturu projekta.

Q: Kada se koriste zajedno, automatsko ožičavanje i automatsko otkrivanje zrna mogu drastično smanjiti količinu koda u XML konfiguracionom fajlu.
- answer: Da
- option: Ne
- explanation: Kombinacija automatskog ožičavanja (autowiring) i automatskog otkrivanja zrna (component scanning) značajno pojednostavljuje Spring konfiguraciju, smanjujući potrebu za eksplicitnom konfiguracijom svakog bean-a u XML fajlu.

Q: Koji je koreni element konfiguracionog XML fajla za deklaraciju zrna?
- option: <applicationcontext>
- option: <bean>
- option: <beanfactory>
- answer: <beans>
- explanation: <beans> je root element u Spring XML konfiguracionom fajlu koji sadrži definicije svih bean-ova i drugih Spring konfiguracionih elemenata.

Q: U Springu Anotacije:
- answer: neophodno ih je uključiti
- option: pružaju dodatne informacije o programu (same po sebi su deo programa)
- answer: pružaju dodatne informacije o programu (iako same po sebi nisu deo programa)
- option: su podrazumevane
- option: nije ih potrebno uključiti
- option: nisu podrazumevane
- answer: su oblik metapodataka
- explanation: Anotacije u Springu su metapodaci koji pružaju dodatne informacije o klasi, metodi ili polju. Da bi bile aktivne, potrebno ih je eksplicitno uključiti kroz konfiguraciju, najčešće korišćenjem <context:annotation-config> ili <context:component-scan> elemenata.

Q: Objekti deklarišu svoje zavisnosti, odnosno druge objekte koji su im potrebni za normalan rad isključivo na jedan od sledećih načina:
- answer: Kroz argumente factory metode
- option: Kroz argumente konstruktora kojima se instanca objekata setuje nakon konstrukcije.
- answer: Kroz argumente konstruktora.
- option: Kroz argumente property metode kojem se instanca objekata setuje nakon konstrukcije.
- answer: Kao property kojem se instanca objekta setuje nakon konstrukcije.
- explanation: U Spring dependency injection, zavisnosti se mogu deklarisati kroz konstruktor, factory metode ili setter metode (properties). Ovo omogućava fleksibilnost u definisanju međuzavisnosti između objekata.

Q: Ukoliko je potrebno, mogu se definisati init i destroy metode na nivou:
- option: konfiguracionog fajla
- answer: elementa bean
- option: klasa aplikacije
- explanation: U Spring konfiguraciji, init i destroy metode se mogu definisati direktno na nivou bean elementa koristeći atribute init-method i destroy-method, što omogućava precizno upravljanje životnim ciklusom bean-ova.

Q: Na koja dva osnovna principa se zasniva Spring?
- answer: Aspektno orijentisano programiranje (AOP)
- answer: Dependency Injection
- option: Stroga provera tipova
- option: Enkapsulacija
- explanation: Dva ključna principa Spring framework-a su Dependency Injection (injektovanje zavisnosti) koji omogućava labavu spregu između komponenti, i Aspect-Oriented Programming (AOP) koji omogućava razdvajanje cross-cutting concerns.

Q: U Spring okruženju postoji više načina za povezivanje komponenti, ali najčešći pristup je putem:
- option: XHTML konfiguracionog fajla.
- option: HTML konfiguracionog fajla.
- option: XTML konfiguracionog fajla.
- answer: XML konfiguracionog fajla.
- explanation: XML konfiguracioni fajl je tradicionalni i najčešći način konfiguracije Spring aplikacija, koji omogućava deklarativno definisanje bean-ova, njihovih zavisnosti i drugih konfiguracionih parametara.

Q: Proste fabrike zrna su često za većinu aplikacija:
- answer: Niskog nivoa
- option: Visokog nivoa
- explanation: Proste fabrike zrna (simple bean factories) su osnovni mehanizam za kreiranje i upravljanje bean-ovima u Spring framework-u. One predstavljaju jednostavnu implementaciju kontejnera, pogodnu za jednostavnije aplikacije ili kao osnova za naprednije Spring kontejnere.

Q: U slučaju injekcije zavisnosti (dependency injection), tačne su koje dve tvrdnje?
- answer: zavisnosti obično dodeljuje treća strana koja koordiniše svim objektima u sistemu
- answer: objektima se zavisnosti dodeljuju za vreme kreiranja
- option: objektima zavisnosti od drugih objekata uopšte nisu potrebne
- option: objekti su sami zaduženi da dobave reference objekata od kojih zavise
- explanation: Dependency Injection princip podrazumeva da zavisnosti dodeljuje centralni koordinator (Spring kontejner), i to u trenutku kreiranja objekta. Ovo omogućava fleksibilnost i smanjuje direktne zavisnosti između komponenti.

Q: Ukoliko neki objekat čuva svoje zavisnosti u obliku njihovih interfejsa:
- option: zavisnost se ne može zameniti sa nekom drugom.
- answer: zavisnost se može zameniti sa nekom drugom, a da objekat koji zavisi ne primeti razliku.
- option: zavisnost se može zameniti sa nekom drugom, ali objekat koji zavisi će primeti razliku.
- explanation: Korišćenje interfejsa za definisanje zavisnosti omogućava laku zamenu implementacije bez menjanja koda koji koristi taj interfejs. Ovo je ključni princip loose coupling (labave sprege) u objektno-orijentisanom dizajnu.

Q: Element <context:component-scan> radi sve što radi <context:annotation-config> element, uz jednu dodatnu funkcionalnost:
- option: On konfiguriše Spring da polu-automatski otkrije zrna i deklariše ih uz pomoć nas.
- answer: On konfiguriše Spring da automatski otkrije zrna i deklariše ih umesto nas.
- option: On konfiguriše Spring da polu-automatski otkrije zrna i deklariše ih umesto nas.
- option: On konfiguriše Spring da automatski otkrije zrna i deklariše ih uz pomoć nas.
- explanation: <context:component-scan> element ne samo da omogućava korišćenje anotacija, već i automatski skenira pakete i pronalazi komponente koje treba registrovati kao Spring bean-ove, čime značajno pojednostavljuje konfiguraciju.

Q: <map> tip konfiguracionih elemenata koji odgovaraju kolekcijama se koristi za:
- answer:Ožičavanje kolekcije u obliku parova ime-vrednost, gde ime i vrednost mogu biti bilo kog tipa
- option: Ožičavanje skupa vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje liste vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje skupa vrednosti, duplikati su dozvoljeni
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde su i ime i vrednost tipa String
- option: Ožičavanje liste vrednosti, duplikati su dozvoljeni
- explanation: <map> element u Spring XML konfiguraciji služi za definisanje Map kolekcije gde svaki element ima ključ i vrednost koji mogu biti različitih tipova, što odgovara ponašanju Java Map interfejsa.

Q: Do prave injekcije zavisnosti dolazi u slučaju kada se u zrno injektuje neko drugo zrno.
- option: Ne
- answer: Da
- explanation: Prava injekcija zavisnosti podrazumeva da se objektu (zrnu) dodeljuju reference na druge objekte (zrna) kroz mehanizam dependency injection, umesto da objekat sam kreira ili pronalazi svoje zavisnosti.

Q: Spring koristi sledeće osnovne strategije kako bi smanjio kompleksnost Java programiranja:
- answer: Labava sprega kroz injekciju zavisnosti i upotrebu interfejsa.
- option: Čvrsta sprega kroz injekciju zavisnosti i upotrebu interfejsa.
- option: Lako i maksimalno invazivno programiranje sa POJO
- answer: Deklarativno programiranje kroz aspekte.
- answer: Lako i minimalno invazivno programiranje sa POJO.
- explanation: Spring smanjuje kompleksnost Java programiranja kroz nekoliko ključnih strategija: korišćenje dependency injection za labavu spregu, deklarativno programiranje kroz aspekte, i minimalno invazivno programiranje koristeći POJO (Plain Old Java Objects) klase.

Q: Spring se zasniva na POJO (engl. Plain Old Java Object), zajedno sa konceptima injekcije zavisnosti (engl. Dependency Injection - DI) i aspektno orijentisanog programiranja (AOP).
- option: Ne
- answer: Da
- explanation: Ova tvrdnja tačno opisuje fundamentalne principe Spring framework-a. POJO objekti omogućavaju jednostavnost, dependency injection smanjuje zavisnosti između komponenti, a AOP omogućava razdvajanje cross-cutting concerns.

Q: Ukoliko se u projektu primenjuje Spring, važi sledeće:
- answer: Spring je veoma invazivan, postojeće Java klase biće u potpunosti izmenjene
- option: Spring je srednje invazivan, postojeće Java klase biće značajnije izmenjene 
- option: Spring je minimalno invazivan, postojeće Java klase neće biti značajnije izmenjene
- explanation: Ova tvrdnja je netačna. Spring je zapravo minimalno invazivan framework, koji omogućava da postojeće Java klase ostanu praktično nepromenjene, dodajući funkcionalnosti kroz dependency injection i aspekte bez direktnog menjanja izvornog koda.

Q: Spring neće pretpostavljati koje od zrna treba da ožiči već će izbaciti izuzetak tipa NoSuchBeanDefinitionException:
- option: Ukoliko postoji jedno zrno koje bi moglo da se ožiči
- answer: Ukoliko postoji više od jednog zrna koja bi mogla da se ožiče
- option: Ukoliko postoji više od jednog zrna koja bi mogla da se ožiče na isto polje
- explanation: Kada postoji više bean-ova koji odgovaraju tipu za injektovanje, Spring neće sam odabrati koji će koristiti, već će baciti izuzetak kako bi sprečio dvosmislenost.

Q: Konfiguracija zrna u Spring okruženju se može raditi na koja dva načina?
- answer: putem XML fajla
- answer: putem anotacija
- option: putem HTML
- option: kroz Maven
- option: u manifestu aplikacije
- option: putem JSON
- explanation: Spring omogućava dve primarne metode konfiguracije zrna: kroz XML fajlove (tradicionalni pristup) i putem anotacija (moderiniji, lakši pristup).

Q: Metoda RowMapper interfejsa koja se mora nadjačati i u kojoj se mora definisati kako se konstruiše domenski objekat na osnovu jednog reda iz rezultujućeg skupa podataka i koja vraća taj objekat kao rezultat zove se:
- answer: mapRow()
- option: populateRow()
- option: query()
- option: update()
- explanation: mapRow() metoda RowMapper interfejsa se koristi za mapiranje jednog reda iz ResultSet-a u domenski objekat, omogućavajući jednostavnu transformaciju podataka iz baze u Java objekte.

Q: AOP omogućava modularizaciju ovakvih servisa, i njihovo deklarativno primenjivanje u aplikaciji:
- answer: nad tačno određenim komponentama na koje treba da imaju uticaj.
- option: nad svim komponentama na koje nemaju uticaj.
- option: nad jednoj odredenoj komponenti koja ima najveći uticaj.
- explanation: AOP omogućava precizno definisanje gde će se dodatni servisi (poput logovanja, sigurnosti) primeniti, čime se postiže bolja modularnost i razdvajanje odgovornosti.

Q: Spring koristi injekciju zavisnosti (DI) za upravljanje komponentama koje čine jednu aplikaciju. To uključuje:
- answer: Kreiranje veza između komponenti koje treba da sarađuju zajedno.
- option: Kreiranje dodatnih funkcionalnosti između komponti koje treba da sarađuju zajedno
- option: Uklanjanje redudantnih veza između komponenti koje treba da sarađuju zajedno.
- explanation: Dependency Injection u Spring-u podrazumeva automatsko uspostavljanje i upravljanje vezama između komponenti, čime se smanjuje direktna zavisnost između njih.

Q: Jezik koji se koristi za definiciju tačke preseka (pointcut), se naziva:
- option: Java pointcut jezik
- answer: AspectJ pointcut jezik
- option: XML pointcut jezik
- option: IntelliJ pointcut jezik
- explanation: AspectJ pointcut jezik je standardni jezik za definisanje tačaka preseka u aspektno orijentisanom programiranju, koji Spring koristi za implementaciju AOP funkcionalnosti.

Q: Zrna u Spring okruženju su po default podešavanju:
- option: Prototype
- option: Context
- answer: Singleton
- option: Factory
- option: Ništa od navedenog
- explanation: Singleton opseg je podrazumevani način kreiranja bean-ova u Spring framework-u. To znači da se za svaki bean kreira samo jedna instanca koja se deli između svih komponenti koje zahtevaju taj bean, čime se štedi memorija i omogućava centralizovano upravljanje objektima.

Q: Kada neki objekat čuva svoje zavisnosti u obliku njihovih interfejsa:
- option: zavisnost se ne može zameniti sa nekom drugom.
- answer: zavisnost se može zameniti sa nekom drugom, a da objekat koji zavisi ne primeti razliku.
- option: zavisnost se može zameniti sa nekom drugom, ali objekat koji zavisi će primeti razliku.
- explanation: Korišćenje interfejsa za definisanje zavisnosti omogućava laku zamenu implementacije bez menjanja koda koji koristi taj interfejs. Ovo je ključni princip loose coupling (labave sprege) u objektno-orijentisanom dizajnu, koji Spring framework intenzivno koristi.

Q: Jezik koji se koristi za definiciju tačke preseka (pointcut), se naziva:
- option: Java pointcut jezik
- answer: AspectJ pointcut jezik
- option: XML pointcut jezik
- option: IntelliJ pointcut jezik
- explanation: AspectJ pointcut jezik je standardizovan jezik za definisanje tačaka preseka u aspektno orijentisanom programiranju. Spring koristi ovaj jezik za precizno definisanje mesta gde će aspekti biti primenjeni u kodu.

Q: Koja se anotacija koristi za definisanje tačke preseka (pointcut)?
- answer: @Pointcut
- option: nijedan od navedenih
- option: @PointcutExecution
- option: @JoinPoint
- explanation: @Pointcut anotacija se koristi za definisanje tačke preseka u AspectJ/Spring AOP. Ona označava mesto u kodu gde će aspekt biti primenjen, omogućavajući precizno definisanje gde će se dodatna funkcionalnost izvršiti.

Q: Core Container Spring modul sadrži:
- answer: Beans
- answer: Context
- answer: Core
- option: ORM
- option: Web
- option: WebSocket
- option: Servlet
- answer: SpEL
- option: JDBC
- explanation: Core Container je centralni modul Spring framework-a koji uključuje ključne komponente za upravljanje bean-ovima: Beans (za definiciju bean-ova), Context (za kontekst aplikacije), Core (osnovne funkcionalnosti) i SpEL (Spring Expression Language).

Q: Zrna se kreiraju uz pomoć metapodataka koji se prosleđuju kontejneru u obliku:
- option: <beans><beans/> tagova
- option: HTML fajla
- option: XHTML fajla
- answer: <bean> <bean/> tagova
- option: XTML fajla
- answer: XML fajla
- explanation: U Spring konfiguraciji, bean-ovi se definišu kroz XML fajlove koristeći <bean> tagove, koji pružaju detaljne metapodatke kontejneru o tome kako da kreira, konfiguriše i upravlja objektima.

Q: Core container:
- option: ovim modulom dodaje se sloj razumljivih izuzetaka iznad izuzetaka koje izbacuju različite baze podataka, čime se uprošćava rukovanje izuzecima.
- answer: je centralni deo koji određuje kako se zrna kreiraju, konfigurišu i zadužen je za upravljanje njima.
- option: često rezultuje gomilom viška koda, poput dohvatanja konekcije, pripreme upita, izvršavanja upita, obrade rezultata i zatvaranja konekcije.
- explanation: Core container je ključni deo Spring framework-a koji upravlja kompletnim životnim ciklusom bean-ova - od njihovog kreiranja, konfigurisanja, injektovanja zavisnosti, pa do uklanjanja.

Q: Modul Testing:
- option: Ovaj modul daje podršku za dodavanje agenata Java virtuelnoj mašini.
- answer: ima podršku za integraciono testiranje, kroz učitavanje različitih kolekcija zrna u kontekst aplikacije.
- explanation: Spring Testing modul olakšava pisanje integracijskih testova, omogućavajući jednostavno učitavanje Spring konteksta i testiranje komponenti u okruženju veoma sličnom produkcijskom.

Q: @Component stereotipna anotacija je:
- option: anotacija koja označava da klasa definiše servis.
- option: anotacija koja označava da je klasa repozitorijum podataka.
- option: anotacija koja specificira da klasa definiše Spring MVC kontroler.
- answer: anotacija opšte namene koja nagoveštava da je klasa koja je označena na ovaj način Spring komponenta.
- explanation: @Component je generička anotacija koja označava da je klasa Spring komponenta. Druge stereotipske anotacije poput @Service, @Repository i @Controller su specijalizovane verzije @Component anotacije.

Q: Šta je Maven i zbog čega se intenzivno koristi u razvoju Java aplikacija?
- option: Maven je klasa koja se koristi za pokretanje aplikacije.
- option: Maven je plugin koji se koristi za pisanje koda
- answer: Maven je alat koji se koristi za build i rukovodjenje bilo kojim Java projektom.
- explanation: Maven je moćan alat za upravljanje Java projektima koji automatizuje build proces, upravlja zavisnostima, olakšava testiranje i deployment, te standardizuje strukturu projekta.

Q: Kada se koriste zajedno, automatsko ožičavanje i automatsko otkrivanje zrna mogu drastično smanjiti količinu koda u XML konfiguracionom fajlu.
- answer: Da
- option: Ne
- explanation: Kombinacija automatskog ožičavanja (autowiring) i automatskog otkrivanja zrna (component scanning) značajno pojednostavljuje Spring konfiguraciju, smanjujući potrebu za eksplicitnom konfiguracijom svakog bean-a u XML fajlu.

Q: Koji je koreni element konfiguracionog XML fajla za deklaraciju zrna?
- option: <applicationcontext>
- option: <bean>
- option: <beanfactory>
- answer: <beans>
- explanation: <beans> je root element u Spring XML konfiguracionom fajlu koji sadrži kompletan skup bean definicija i drugih Spring konfiguracionih elemenata.

Q: U Springu Anotacije:
- answer: neophodno ih je uključiti
- option: pružaju dodatne informacije o programu (same po sebi su deo programa)
- answer: pružaju dodatne informacije o programu (iako same po sebi nisu deo programa)
- option: su podrazumevane
- option: nije ih potrebno uključiti
- option: nisu podrazumevane
- answer: su oblik metapodataka
- explanation: Anotacije u Springu su metapodaci koji pružaju dodatne informacije o klasi, metodi ili polju. Da bi bile aktivne, potrebno ih je eksplicitno uključiti kroz konfiguraciju, najčešće korišćenjem <context:annotation-config> ili <context:component-scan> elemenata.

Q: Objekti deklarišu svoje zavisnosti, odnosno druge objekte koji su im potrebni za normalan rad isključivo na jedan od sledećih načina:
- answer: Kroz argumente factory metode
- option: Kroz argumente konstruktora kojima se instanca objekata setuje nakon konstrukcije.
- answer: Kroz argumente konstruktora.
- option: Kroz argumente property metode kojem se instanca objekata setuje nakon konstrukcije.
- answer: Kao property kojem se instanca objekta setuje nakon konstrukcije.
- explanation: U Spring dependency injection, zavisnosti se mogu deklarisati kroz konstruktor, factory metode ili setter metode (properties). Ovo omogućava fleksibilnost u definisanju međuzavisnosti između objekata.

Q: Ukoliko je potrebno, mogu se definisati init i destroy metode na nivou:
- option: konfiguracionog fajla
- answer: elementa bean
- option: klasa aplikacije
- explanation: U Spring konfiguraciji, init i destroy metode se mogu definisati direktno na nivou bean elementa koristeći atribute init-method i destroy-method, što omogućava precizno upravljanje životnim ciklusom bean-ova.

Q: Na koja dva osnovna principa se zasniva Spring?
- answer: Aspektno orijentisano programiranje (AOP)
- answer: Dependency Injection
- option: Stroga provera tipova
- option: Enkapsulacija
- explanation: Dva ključna principa Spring framework-a su Dependency Injection (injektovanje zavisnosti) koji omogućava labavu spregu između komponenti, i Aspect-Oriented Programming (AOP) koji omogućava razdvajanje cross-cutting concerns.

Q: U Spring okruženju postoji više načina za povezivanje komponenti, ali najčešći pristup je putem:
- option: XHTML konfiguracionog fajla.
- option: HTML konfiguracionog fajla.
- option: XTML konfiguracionog fajla.
- answer: XML konfiguracionog fajla.
- explanation: XML konfiguracioni fajl je tradicionalni i najčešći način konfiguracije Spring aplikacija, koji omogućava deklarativno definisanje bean-ova, njihovih zavisnosti i drugih konfiguracionih parametara.

Q: Proste fabrike zrna su često za većinu aplikacija:
- answer: Niskog nivoa
- option: Visokog nivoa
- explanation: Proste fabrike zrna (simple bean factories) su osnovni mehanizam za kreiranje i upravljanje bean-ovima u Spring framework-u. One predstavljaju jednostavnu implementaciju kontejnera, pogodnu za jednostavnije aplikacije ili kao osnova za naprednije Spring kontejnere.

Q: U slučaju injekcije zavisnosti (dependency injection), tačne su koje dve tvrdnje?
- answer: zavisnosti obično dodeljuje treća strana koja koordiniše svim objektima u sistemu
- answer: objektima se zavisnosti dodeljuju za vreme kreiranja
- option: objektima zavisnosti od drugih objekata uopšte nisu potrebne
- option: objekti su sami zaduženi da dobave reference objekata od kojih zavise
- explanation: Dependency Injection princip podrazumeva da zavisnosti dodeljuje centralni koordinator (Spring kontejner), i to u trenutku kreiranja objekta. Ovo omogućava fleksibilnost i smanjuje direktne zavisnosti između komponenti.

Q: Ukoliko neki objekat čuva svoje zavisnosti u obliku njihovih interfejsa:
- option: zavisnost se ne može zameniti sa nekom drugom.
- answer: zavisnost se može zameniti sa nekom drugom, a da objekat koji zavisi ne primeti razliku.
- option: zavisnost se može zameniti sa nekom drugom, ali objekat koji zavisi će primeti razliku.
- explanation: Korišćenje interfejsa za definisanje zavisnosti omogućava laku zamenu implementacije bez menjanja koda koji koristi taj interfejs. Ovo je ključni princip loose coupling (labave sprege) u objektno-orijentisanom dizajnu.

Q: Element <context:component-scan> radi sve što radi <context:annotation-config> element, uz jednu dodatnu funkcionalnost:
- option: On konfiguriše Spring da polu-automatski otkrije zrna i deklariše ih uz pomoć nas.
- answer: On konfiguriše Spring da automatski otkrije zrna i deklariše ih umesto nas.
- option: On konfiguriše Spring da polu-automatski otkrije zrna i deklariše ih umesto nas.
- option: On konfiguriše Spring da automatski otkrije zrna i deklariše ih uz pomoć nas.
- explanation: <context:component-scan> element ne samo da omogućava korišćenje anotacija, već i automatski skenira pakete i pronalazi komponente koje treba registrovati kao Spring bean-ove, čime značajno pojednostavljuje konfiguraciju.

Q: <map> tip konfiguracionih elemenata koji odgovaraju kolekcijama se koristi za:
- answer:Ožičavanje kolekcije u obliku parova ime-vrednost, gde ime i vrednost mogu biti bilo kog tipa
- option: Ožičavanje skupa vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje liste vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje skupa vrednosti, duplikati su dozvoljeni
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde su i ime i vrednost tipa String
- option: Ožičavanje liste vrednosti, duplikati su dozvoljeni
- explanation: <map> element u Spring XML konfiguraciji služi za definisanje Map kolekcije gde svaki element ima ključ i vrednost koji mogu biti različitih tipova, što odgovara ponašanju Java Map interfejsa.

Q: Do prave injekcije zavisnosti dolazi u slučaju kada se u zrno injektuje neko drugo zrno.
- option: Ne
- answer: Da
- explanation: Prava injekcija zavisnosti podrazumeva da se objektu (zrnu) dodeljuju reference na druge objekte (zrna) kroz mehanizam dependency injection, umesto da objekat sam kreira ili pronalazi svoje zavisnosti.

Q: Spring koristi sledeće osnovne strategije kako bi smanjio kompleksnost Java programiranja:
- answer: Labava sprega kroz injekciju zavisnosti i upotrebu interfejsa.
- option: Čvrsta sprega kroz injekciju zavisnosti i upotrebu interfejsa.
- option: Lako i maksimalno invazivno programiranje sa POJO
- answer: Deklarativno programiranje kroz aspekte.
- answer: Lako i minimalno invazivno programiranje sa POJO.
- explanation: Spring smanjuje kompleksnost Java programiranja kroz nekoliko ključnih strategija: korišćenje dependency injection za labavu spregu, deklarativno programiranje kroz aspekte, i minimalno invazivno programiranje koristeći POJO (Plain Old Java Objects) klase.

Q: Spring se zasniva na POJO (engl. Plain Old Java Object), zajedno sa konceptima injekcije zavisnosti (engl. Dependency Injection - DI) i aspektno orijentisanog programiranja (AOP).
- option: Ne
- answer: Da
- explanation: Ova tvrdnja tačno opisuje fundamentalne principe Spring framework-a. POJO objekti omogućavaju jednostavnost, dependency injection smanjuje zavisnosti između komponenti, a AOP omogućava razdvajanje cross-cutting concerns.

Q: Ukoliko se u projektu primenjuje Spring, važi sledeće:
- answer: Spring je veoma invazivan, postojeće Java klase biće u potpunosti izmenjene
- option: Spring je srednje invazivan, postojeće Java klase biće značajnije izmenjene 
- option: Spring je minimalno invazivan, postojeće Java klase neće biti značajnije izmenjene
- explanation: Ova tvrdnja je netačna. Spring je zapravo minimalno invazivan framework, koji omogućava da postojeće Java klase ostanu praktično nepromenjene, dodajući funkcionalnosti kroz dependency injection i aspekte bez direktnog menjanja izvornog koda.

Q: Spring neće pretpostavljati koje od zrna treba da ožiči već će izbaciti izuzetak tipa NoSuchBeanDefinitionException:
- option: Ukoliko postoji jedno zrno koje bi moglo da se ožiči
- answer: Ukoliko postoji više od jednog zrna koja bi mogla da se ožiče
- option: Ukoliko postoji više od jednog zrna koja bi mogla da se ožiče na isto polje
- explanation: Kada postoji više bean-ova koji odgovaraju tipu za injektovanje, Spring neće sam odabrati koji će koristiti, već će baciti izuzetak kako bi sprečio dvosmislenost.

Q: Konfiguracija zrna u Spring okruženju se može raditi na koja dva načina?
- answer: putem XML fajla
- answer: putem anotacija
- option: putem HTML
- option: kroz Maven
- option: u manifestu aplikacije
- option: putem JSON
- explanation: Spring omogućava dve primarne metode konfiguracije zrna: kroz XML fajlove (tradicionalni pristup) i putem anotacija (moderiniji, lakši pristup).

Q: Učitavanje konteksta aplikacije iz klasne putanje se koristi na sledeći način:
- option: ApplicationContext context = new FileSystemXmlApplicationContext("C:/vitez.xml");
- option: ApplicationContext context = new ClassPathXmlApplicationContext("C:/vitez.xml");
- answer: ApplicationContext content = new ClassPathXmlApplicationContext("vitez.xml");
- option: Ništa od navedenog.
- option: ApplicationContext context = new FileSystemXmlApplicationContext("vitez.xml");
- explanation: ClassPathXmlApplicationContext se koristi za učitavanje Spring konfiguracionog XML fajla koji se nalazi na klasnoj putanji projekta. Ovo je najčešći način konfiguracije u Java projektima, gde se konfiguracioni fajl nalazi u resources direktorijumu.

Q: Svakom zrnu se mogu dodati metode koje će:
- option: biti izvršene odman nakon uništenja zrna (destroy).
- answer: biti izvršene odmah nakon kreiranja zrna (init)
- answer: biti izvršene neposredno pre uništenja zrna (destroy).
- option: biti izvršene neposredno pre kreiranja zrna (init).
- explanation: Spring omogućava definisanje init i destroy metoda za svaki bean. Init metode se izvršavaju nakon što je bean kreiran i konfigurisan, dok destroy metode služe za čišćenje resursa neposredno pre uklanjanja bean-a iz kontejnera.

Q: Koji XML tag se koristi za deklarisanje saveta aspekta koji treba da se izvrši nakon uspešnog povratka iz ciljane metode?
- option: aop:before
- option: nijedan od ponuđenih
- answer: aop:after-throwing
- answer: aop:after-returning
- option: aop:after
- explanation: <aop:after-returning> tag se koristi za definisanje saveta (advice) koji se izvršava samo kada ciljana metoda uspešno završi bez izbacivanja izuzetka. Ovo je korisno za implementaciju naknadnih akcija koje zavise od uspešnog izvršenja metode.

Q: Modul Instrumentation:
- option: ima podršku za integraciono testiranje, kroz učitavanje različitih kolekcija zrna u kontekst aplikacije.
- answer: daje podršku za dodavanje agenata Java virtuelnoj mašini.
- explanation: Instrumentation modul Spring framework-a omogućava dinamičko menjanje ponašanja Java klasa tokom izvršavanja, što je korisno za implementaciju naprednih tehnika poput load-time weaving-a u aspektno orijentisanom programiranju.

Q: @Inject anotacija može da zameni @Autowired anotaciju?
- option: Ne
- answer: Da
- explanation: @Inject anotacija je deo Java CDI (Contexts and Dependency Injection) standarda i funkcioniše veoma slično @Autowired anotaciji u Spring framework-u. Obe služe za injektovanje zavisnosti, sa minimalnim razlikama u ponašanju.

Q: Labava sprega putem interfejsa je:
- answer: Glavna prednost DI
- option: Glavna mana DI
- explanation: Labava sprega (loose coupling) kroz korišćenje interfejsa je ključna prednost Dependency Injection principa. Omogućava fleksibilnost, lakše testiranje i zamenu komponenti bez menjanja postojećeg koda.

Q: Aspekti su uz Dependency Injection drugi glavni stub na kojima se zasniva Spring.
- option: Ne 
- answer: Da
- explanation: Aspect-Oriented Programming (AOP) zajedno sa Dependency Injection čini fundamentalne principe Spring framework-a. AOP omogućava razdvajanje cross-cutting concerns, čime se postiže bolja modularnost i čistiji dizajn aplikacije.

Q: Kada zrno postane označeno za sakupljanje đubreta (engl. Garbage collection) ono: 
- answer: se nakon nekog vremena uklanja
- option: ostaje u arhivi
- option: postaje sakriveno kako bi nastavilo da sakuplja redundantne podatke
- explanation: Kada objekat postane kandidat za garbage collection, Java Virtual Machine (JVM) ga uklanja iz memorije kada proceni da više nije potreban, oslobađajući memorijski prostor.

Q: Jedino ograničenje kod @Autowired anotacije je:
- answer: Da mora postojati tačno jedno zrno koje se može ožičiti.
- option: Da mora postojati više zrna koja se mogu ožičiti.
- option: Da mora postojati bar jedno zrno koje se može ožičiti.
- explanation: @Autowired zahteva da postoji tačno jedna odgovarajuća implementacija za injektovanje. Ukoliko postoji više bean-ova istog tipa, Spring će baciti izuzetak kako bi izbegli dvosmislenost.

Q: Konteksti aplikacije su:
- answer: nadograđuju fabrike zrna.
- option: najjednostavniji kontejneri koji pružaju osnovnu podršku za DI.
- explanation: ApplicationContext proširuje osnovne mogućnosti BeanFactory kontejnera, dodajući napredne funkcionalnosti poput automatskog otkrivanja bean-ova, podrške za internacionalizaciju, publikovanja događaja i sl.

Q: Automatsko ožičavanje byName - po imenu odnosi se na to da:
- option: Spring pokušava da upari sva polja automatski ožičenog zrna sa zrnima koja imaju isto ili slično ime (odnosno Id) kao i ime polja. Polja za koje nije pronađeno zrno koje može da se upari ostaju neožičena.
- option: Spring pokušava da upari sva polja automatski ožičenog zrna sa zrnima koja imaju isto ili slično ime (odnosno Id) kao i ime polja. Polja za koje nije pronađeno zrno koje može da se upari dodeljuje se opštim zrnima.
- answer: Spring pokušava da upari sva polja automatski ožičenog zrna sa zrnima koja imaju isto ime (odnosno Id) kao i ime polja. Polja za koje nije pronađeno zrno koje može da se upari ostaju neožičena.
- explanation: Automatsko ožičavanje byName strategija pokušava da pronađe bean čije ime tačno odgovara imenu polja koje se injektuje. Ako takav bean ne postoji, polje ostaje neožičeno.

Q: Od objekata se očekuje da kreiraju ili dobave reference objekata od kojih zavise.
- option: Da
- answer: Ne
- explanation: Ovo je suština Inversion of Control (IoC) principa. Objekti ne snose odgovornost za kreiranje ili pronalaženje svojih zavisnosti, već ih dobijaju kroz dependency injection od strane Spring kontejnera.

Q: Koja je osnovna stvar koju je potrebno implementirati za rad sa bazom?
- option: kontroler
- answer: DAO
- option: servis
- explanation: DAO (Data Access Object) je osnovna apstrakcija za pristup podacima u bazi. Implementira konkretne metode za CRUD operacije i apstrahuje detalje rada sa bazom podataka.

Q: FileSystemXmlApplicationContext oblik konteksta aplikacije: 
- answer: učitava kontekst iz jednog ili više XML fajlova koji se nalaze u sistemu fajlova.
- option: učitava kontekst veb aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst iz jednog ili više XML fajlova koje sadrži veb aplikacija.
- option: učitava kontekst iz jednog ili više XML fajlova koji se nalaze na klasnoj putanji projekta.
- explanation: FileSystemXmlApplicationContext se koristi za učitavanje Spring konfiguracionih XML fajlova direktno sa fajl sistema, što je korisno kada konfiguracioni fajlovi nisu deo klasne putanje, već se nalaze na specifičnoj lokaciji na disku.

Q: Argument konstruktora se dodaje upotrebom elementa sa tagom <constructor-arg> sa:
- option: atributom name gde se definiše ime formalnog parametra konstruktora koji treba da prihvati vrednost afributa value, čiji tip nije definisan u atributu type.
- option: atributom name gde se dohvata ime formalnog parametra konstruktora koji treba da dodeli vrednost atributa value, čiji je tip definisan u atributu type.
- answer: atributom name gde se definiše ime formalnog parametra konstruktora koji treba da prihvati vrednost atributa value, čiji je tip definisan u atributu type.
- explanation: U Spring XML konfiguraciji, <constructor-arg> element omogućava precizno definisanje argumenata konstruktora, gde se kroz atribute name i type definiše tačan parametar koji treba da primi vrednost.

Q: Koji je način rada Singleton opseg zrna u Springu?
- option: Opseg važenja zrna je jedan HTTP zahtev. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- answer: Opseg zrna je jedna instanca po kontejneru (podrazumevano)
- option: Dozvoljava više instanciranja zrna
- option: Opseg važenja je jedna HTTP sesija. Ima smisla koristiti samo u veb kontekstu (npr. sa Spring MVC)
- explanation: Singleton opseg je podrazumevani način kreiranja bean-ova u Spring framework-u. To znači da se za svaki bean kreira samo jedna instanca koja se deli između svih komponenti koje zahtevaju taj bean, čime se štedi memorija i omogućava centralizovano upravljanje objektima.

Q: Koji je najčešći način ožičavanja zrna u Spring okruženju?
- option: Manuelno ožičavanje kroz konstruktor
- answer: Automatsko ožičavanje
- option: Manuelno ožičavanje kroz set metode
- explanation: Automatsko ožičavanje (autowiring) je najčešći i najjednostavniji način povezivanja zavisnosti između bean-ova u Spring framework-u. Omogućava Spring kontejneru da automatski pronalazi i injektuje zavisnosti bez eksplicitne konfiguracije.

Q: AnnotationConfigWebApplicationContext oblik konteksta aplikacije:
- option: učitava kontekst iz jednog ili više XML fajlova koji se nalaze na klasnoj putanji projekta.
- answer: učitava kontekst veb aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst iz jednog ili više XML fajlova koji se nalaze u sistemu fajlova.
- option: učitava kontekst aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst iz jednog ili više XML fajlova koje sadrži veb aplikacija.
- explanation: AnnotationConfigWebApplicationContext je specijalizovana verzija konteksta za veb aplikacije koja učitava Spring konfiguraciju direktno iz Java klasa anotiranih sa @Configuration, umesto iz XML fajlova.

Q: Spring ne omogućava povezivanje objekata pomoću injekcije zavisnosti.
- answer: Ne
- option: Da
- explanation: Upravo suprotno, injekcija zavisnosti (Dependency Injection) je jedan od ključnih principa Spring framework-a. Spring omogućava različite načine injektovanja zavisnosti: kroz konstruktor, setter metode i direktno injektovanje polja.

Q: Šta znači kada se kaže da je određeni izuzetak proveravan?
- option: to znači da Spring ne zna kojeg je tipa izuzetak koji je izbačen
- answer: to znači da je rukovanje tim izuzetkom obavezno
- option: to znači da rukovanje tim izuzetkom nije obavezno
- explanation: Proveravan izuzetak (checked exception) zahteva eksplicitno rukovanje u kodu. Programer je obavezan da ili hvata takve izuzetke ili ih prosleđuje dalje deklaracijom throws klauzule.

Q: AnnotationConfigApplicationContext oblik konteksta aplikacije:
- answer: učitava kontekst aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst iz jednog ili više XML fajlova koji se nalaze u sistemu fajlova.
- option: učitava kontekst veb aplikacije iz jedne ili više Java konfiguracionih klasa.
- option: učitava kontekst iz jednog ili više XML fajlova koji se nalaze na klasnoj putanji projekta.
- option: učitava kontekst iz jednog ili više XML fajlova koje sadrži veb aplikacija.
- explanation: AnnotationConfigApplicationContext je kontekst koji učitava Spring konfiguraciju direktno iz Java klasa anotiranih sa @Configuration, što predstavlja moderan, anotacijama vođen pristup konfiguraciji Spring aplikacija.

Q: Deklarisanje zrna upotrebom <bean> elementa, kao i njihova konfiguracija pomoću injekcije odgovarajućih primitivnih vrednosti ili referenci na druga zrna upotrebom <constructor-arg> ili <property> elemenata je prihvatljiva u slučaju:
- option: velike aplikacije sa velikim ukupnim brojem zrna.
- option: velike aplikacije sa malim ukupnim brojem zrna.
- option: male aplikacije sa velikim ukupnim brojem zrna.
- option: ništa od navedenog.
- answer: male aplikacije sa malim ukupnim brojem zrna.
- explanation: Ručno deklarisanje bean-ova kroz XML konfiguraciju je najpogodnije za male projekte sa relativno malim brojem komponenti. Za veće aplikacije, preporučuje se korišćenje automatskog otkrivanja komponenti i anotacija.

Q: <set> tip konfiguracionih elemenata koji odgovaraju kolekcijama se koristi za:
- option: Ožičavanje liste vrednosti, duplikati su dozvoljeni
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde ime i vrednost mogu biti bilo kog tipa
- option: Ožičavanje liste vrednosti, duplikati nisu dozvoljeni
- answer: Ožičavanje skupa vrednosti, duplikati nisu dozvoljeni
- option: Ožičavanje kolekcije u obliku parova ime-vrednost, gde su i ime i vrednost tipa String
- option: Ožičavanje skupa vrednosti, duplikati su dozvoljeni
- explanation: <set> element u Spring XML konfiguraciji služi za definisanje Java Set kolekcije, gde duplikati nisu dozvoljeni, što odgovara ponašanju java.util.Set interfejsa.

Q: Ukoliko je potrebno da se dobije novo zrno svaki put kad se pozove metoda getBean(), opseg je potrebno postaviti na vrednost:
- answer: prototype
- option: request
- option: scope
- option: singleton
- option: session
- explanation: Prototype opseg garantuje da se svaki put kada se zatraži bean, kreira nova instanca. Ovo je suprotno singleton opsegu gde se vraća ista instanca bean-a.

Q: Koje su osnovne tri biblioteke koje je neophodno dodati u Maven projektu za osnovni rad sa Spring okruženjem?
- answer: spring-context
- option: spring-aop
- answer: spring-core
- option: spring-autowire
- answer: spring-beans
- option: spring-annotations
- option: spring-jdbc
- explanation: Za osnovni rad sa Spring framework-om, ključne Maven zavisnosti uključuju spring-context (za kontekst aplikacije), spring-core (za osnovne funkcionalnosti) i spring-beans (za definiciju i upravljanje bean-ovima).

Q: @Repository stereotipna anotacija je:
- answer: anotacija koja označava da je klasa repozitorijum podataka.
- option: anotacija koja specificira da klasa definiše Spring MVC kontroler.
- option: anotacija koja označava da klasa definiše servis.
- option: anotacija opšte namene koja nagoveštava da je klasa koja je označena na ovaj način Spring komponenta.
- explanation: @Repository anotacija se koristi za označavanje klasa koje pristupaju podacima, najčešće implementiraju DAO (Data Access Object) pattern. Ova anotacija prenosi semantiku da klasa upravlja podacima i omogućava Spring-u da primeni dodatne funkcionalnosti poput automatskog hvatanja izuzetaka specifičnih za rad sa bazom podataka.

Q: Koji se tag u XML konfiguraciji koristi za definiciju @Before saveta aspekta?
- option: aop:before-calling
- option: nijedan od ponudjenih
- answer: aop:before
- option: aop:after
- option: aop:afterthrow
- explanation: <aop:before> tag se koristi za definisanje saveta (advice) koji se izvršava pre poziva ciljane metode u AspectJ/Spring AOP konfiguraciji. Ovo omogućava dodavanje dodatne logike koja se izvršava pre glavne metode.

Q: Ukoliko u Spring kontejneru postoji zrno sa id= student, kako se ono dohvata iz aplikacionog konteksta (pretpostaviti da se objekat klase ApplicationContext nalazi u promenljivoj context)
- option: context.newBeanInstance("student")
- answer: context.getBean("student")
- option: context.load("student")
- explanation: Metoda getBean() se koristi za dohvatanje bean-a iz Spring kontejnera po njegovom imenu ili ID-u. Ova metoda vraća postojeću instancu bean-a ili inicijalizuje novi ukoliko ne postoji.

Q: Da li je Spring 5 kompatibilan sa starijim verzijama Jave?
- option: Spring 5 podržava sve verzije Java
- option: Spring 5 podržava Java 7
- answer: Spring 5 je kompatibilan sa verzijom Java 8 i novijim
- option: Spring 5 podržava Java 6
- explanation: Spring 5 zahteva Java 8 ili noviju verziju kao minimum. Ovo omogućava korišćenje modernih Java funkcionalnosti poput lambda izraza, stream API-ja i opcionalnih tipova.

Q: Preko koje metode ServeletConfig objekta se u okviru servleta pristupa atributima?
- option: getServeletConfig ("imeParametra")
- option: getInitParameter ("imeParametra")
- option: getServeletConfigParameter ("imeParametra")
- option: getParameter ("imeParametra")
- answer: getInitParameter ("imeParametra")

Q: Oznaciti tacnu tvrdnju
- option: Savet (Advice) je mesto u kodu koje predstavlja kandidata za uvodjenje aspekta.
- option: Savet je proces primene aspekata a ciljani objekat.
- option: Savet predstavlja akciju odnosno programsku logiku koja se treba izvrsiti nakon okidanja efinisanje tacke spajanja
- option: Savet predstavlja izraz  kome navodimo nad kojim ce se od tacaka spajanja izvrsiti odredjena akcija.
- answer: Savet predstavlja akciju odnosno programsku logiku koja se treba izvrsiti nakon okidanja efinisanje tacke spajanja
- explanation: U AspectJ i Spring AOP, savet (advice) je programski blok koji se izvršava u određenoj tački spajanja (join point) tokom izvršavanja programa. Predstavlja dodatnu logiku koja se dodaje postojećem kodu bez menjanja njegove osnovne strukture.

Q: Sta omogućava primena obrasca DI?
- option: Objekat dobija referencu na klasu sa kojom saradjuje od koordinatora svih objekata  sistemu.
- option: Objekt dobija referensu na objekat sa kojim saradjuje od koordinatora svih objekata  sistemu.
- option: Klasa dobija referensu na klasu sa kojom saradjuje od koordinatora svih objekata  sistemu.
- option: Klasa dobija referensu na klasu sa kojim saradjuje od koordinatora svih klasa u  sistemu.
- answer: Objekt dobija referensu na objekat sa kojim saradjuje od koordinatora svih objekata  sistemu.
- explanation: Dependency Injection (DI) omogućava da objekti dobijaju svoje zavisnosti od centralizovanog koordinatora (kontejnera), umesto da ih sami kreiraju. Ovo smanjuje spregu između komponenti i čini kod fleksibilnijim i lakšim za testiranje.

Q: Da bi radili sa servletima u Eclipse, projekat kreiramo kao:
- option: Static Web Project
- option: Maven project
- option: Application client project
- option: Dinamic Web Project
- option: Web Service
- answer: Dinamic Web Project
- explanation: Dinamic Web Project je standardni tip projekta u Eclipse-u za razvoj Java veb aplikacija koje koriste servlete. Ovaj projekat automatski postavlja neophodne konfiguracije za servlet razvoj, uključujući web.xml i potrebne direktorijume.

Q: Oznaciti sve nacine rada automatskog injection objekta u Springu
- option: Setter injection
- option: Getter injection
- option: List injection
- option: Constructor injection
- option: Class Injection
- option: Anotation Injection
- option: Object Injection
- option: Bean Injection
- answer: Setter injection
- answer: Constructor injection
- answer: Anotation Injection
- explanation: Spring podržava tri primarna načina automatskog injektovanja zavisnosti: setter metode (setter injection), konstruktor (constructor injection) i anotacije (annotation injection). Svaki od ovih pristupa omogućava fleksibilno upravljanje zavisnostima između komponenti.

Q: Kojom linijom koda se pravilno dodaje cookie u Servlet1 klasi?
- option: response.addCookie(ck);
- option: context.addCookie(ck);
- option: request.addCookie(ck);
- option: config.addCookie(ck);
- answer: response.addCookie(ck);
- explanation: U servlet programiranju, HttpServletResponse objekat se koristi za dodavanje cookie-ja koji će biti poslati nazad klijentu. Metoda addCookie() je standardni način za dodavanje novog cookie-ja u HTTP odgovor.

Q: Sta je tacno za java Collection Type java.util.Map<K,V>?
- option: K i V su objekti
- option: K i V su string
- option: K je objekat, V string
- option: K je string, V objekat
- answer: K i V su objekti
- explanation: Java Map interfejs dozvoljava da ključevi (K) i vrednosti (V) budu bilo koji objektni tipovi. Ovo omogućava fleksibilno čuvanje i pretraživanje podataka različitih tipova.

Q: Koje biblioteke moraju biti dodate u dependencies tag u pom.xml kod Springa?
- option: core,context,config
- option: beans,context,config
- option: core,beans,context
- option: core,beans,config
- answer: core,beans,context
- explanation: Za osnovni Spring projekat, ključne Maven zavisnosti uključuju spring-core (osnovna funkcionalnost), spring-beans (upravljanje bean-ovima) i spring-context (kontekst aplikacije).

Q: Koliko ServletContext objekata se kreira u okviru jedne web aplikacije?
- option: Onoliko koliko ima requesta-a
- option: Onoliko koliko ima servleta
- option: Samo jedan
- option: Najmanje jedan
- answer: Samo jedan
- explanation: ServletContext je jedinstveni objekat koji predstavlja kontekst cele veb aplikacije. Kreira se jednom prilikom pokretanja aplikacije i dostupan je svim servlet-ima u okviru te aplikacije.

Q: U web.xml fajlu za svaki servlet se kreira:
- option: servlet-mapping u kome se definise servlet-name i servlet-class
- option: servlet-mapping u kome se definise servlet-name i url-pattern
- option: servlet-mapping u kome se definise servlet-name i servlet-class i url-pattern
- option: servlet-mapping u kome se definise servlet-class i url-pattern
- answer: servlet-mapping u kome se definise servlet-name i url-pattern
- explanation: U web.xml fajlu, servlet-mapping element povezuje ime servleta (servlet-name) sa URL putanjom (url-pattern) koja će aktivirati taj servlet kada korisnik pristupi datoj adresi.

Q: Ako se koristi include za prosleđivanje zahteva iz servlet 1 u servlet 2, ko šalje odgovor klijentu?
- option: genericki servlet
- option: servlet 1 pre nego sto dobije response od servleta 2
- option: servlet 2
- option: servlet 1 nakon sto dobije response od servleta 2
- answer: servlet 1 nakon sto dobije response od servleta 2
- explanation: Kada se koristi RequestDispatcher.include(), servlet 1 prima odgovor od servleta 2 i šalje kompletan odgovor klijentu. Ovo omogućava uključivanje sadržaja iz više servleta u jednom HTTP odgovoru.

Q: Sta sadrze JAR fajlovi?
- option: Web servise za rad sa servletima
- option: Klase i interfejse koji omogucavaju implementaciju servleta
- option: Kontrolere za rad sa servletima
- option: API -ije za rad sa servletima
- answer: Klase i interfejse koji omogucavaju implementaciju servleta
- explanation: JAR (Java Archive) fajlovi sadrže kompajlirane Java klase, interfejse, resurse i meta-informacije neophodne za implementaciju servlet tehnologije.

Q: Koje Injecting Collection se mogu koristiti u Springu?
- option: array
- option: map
- option: entry
- option: dictionary
- option: set
- option: get
- option: props
- option: list
- answer: array
- answer: map
- answer: set
- answer: props
- answer: list
- explanation: Spring podržava injektovanje različitih Java kolekcija: nizovi (array), mape (map), skupovi (set), i properties (props). Ovo omogućava fleksibilno konfigurisanje zavisnosti koje zahtevaju složenije strukture podataka.

Q: Sta je tacno za Servlet tehnologiju?
- option: Servlet tehnologija se koristi za kreiranje web aplikacija i nalazi se na strani servera, a generise staticku veb stranicu
- option: Servlet tehnologija se koristi za kreiranje web aplikacija i nalazi se na strani klijenta, a generise dinamicku veb stranicu
- option: Servlet tehnologija se koristi za kreiranje web aplikacija i nalazi se na strani klijenta, a generise staticku veb stranicu
- option: Servlet tehnologija se koristi za kreiranje web aplikacija i nalazi se na strani servera, a generise dinamicku veb stranicu
- answer: Servlet tehnologija se koristi za kreiranje web aplikacija i nalazi se na strani servera, a generise dinamicku veb stranicu
- explanation: Servlet tehnologija je Java API za kreiranje dinamičkih veb aplikacija na serverskoj strani. Servleti omogućavaju generisanje dinamičkog sadržaja koji se prilagođava zahtevima korisnika.

Q: Ako koristimo metodu doGet i želimo HTML odgovor, koju liniju koda dodajemo?
- option: response.setContentType("text/html");
- option: response.setContentType("html");
- option: request.setContentType("html");
- option: request.setContentType("text/html");
- answer: response.setContentType("text/html");
- explanation: Metoda setContentType() na HttpServletResponse objektu se koristi za postavljanje tipa sadržaja koji će biti poslat klijentu. "text/html" označava da se šalje HTML dokument.

Q: Oznaciti tacne tvrdnje o ServletContext i ServletConfig
- option: ServletContext objekat sadrzi parametre kojima se moze pristupati samo u okviru servleta za koji je kreiran
- option: ServletContext objekat sadrzi parametre kojima se moze pristupati svi serveleti u okviru jedne web aplikacije
- option: ServletConfig objekat sadrzi parametre kojima se moze pristupati samo u okviru servleta za koji je kreiran
- option: ServletConfig objekat sadrzi parametre kojima se moze pristupati svi serveleti u okviru jedne web aplikacije
- answer: ServletContext objekat sadrzi parametre kojima se moze pristupati svi serveleti u okviru jedne web aplikacije
- answer: ServletConfig objekat sadrzi parametre kojima se moze pristupati samo u okviru servleta za koji je kreiran
- explanation: ServletContext predstavlja globalni kontekst za celu veb aplikaciju i omogućava deljenje parametara između svih servleta, dok ServletConfig sadrži specifične parametre za pojedinačni servlet.

Q: Utkivanje (weaving) se može izvršiti:
- option: Za vreme ucitvanje klase
- option: Pre izvrsavanja
- option: Za vreme kompajliranja
- option: Za vreme ucitvanja klase
- option: Za vreme ucitvanje koda
- option: Za vreme izvrsavanja
- answer: Za vreme ucitvanje klase
- answer: Za vreme kompajliranja
- answer: Za vreme izvrsavanja
- explanation: Weaving (utkivanje) u aspektno orijentisanom programiranju može se izvršiti na više načina: tokom učitavanja klase, kompajliranja ili tokom izvršavanja programa, što omogućava fleksibilnu primenu aspekata.

Q: Koji tip podataka vraca metoda getBean klase u ApplicationContext?
- option: Int
- option: Objekat korisnicke klase
- option: Bean
- option: Boolean
- option: Config
- option: Context
- option: Object
- answer: Object
- explanation: Metoda getBean() vraća Object, što omogućava fleksibilnost pri dohvatanju bean-ova različitih tipova. Potrebno je kastovanje do specifičnog tipa koji se očekuje.

Q: Mapiranje adresa (logicka i fizicka putanja servleta) se definise u kom fajlu?
- option: beans.xml
- option: servlet.xml
- option: pom.xml
- option: web.xml
- answer: web.xml
- explanation: Web.xml je konfiguracioni fajl za Java veb aplikacije koji definiše mapiranje servleta, parametre i druge postavke kontejnera.

Q: Atribut kojem mogu pristupiti svi servleti mora se definisati kao:
- option: ServletContext objekat
- option: ServletRequestDispatcher objekat
- option: ServletDispatcher objekat
- option: ServletConfig objekat
- answer: ServletContext objekat
- explanation: ServletContext je jedini objekat koji omogućava deljenje atributa između svih servleta u okviru jedne veb aplikacije.

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