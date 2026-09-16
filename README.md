# Útulek zvířat s virtuální adopcí
## Zadání

V projektu musí být implementace následujících bodů. (+ je také potřeba odevzdat i s originálním řešením zadaných úkolů během semestru!)

7. týden v semestru -> odevzdání návrhu webové aplikace projektu (funkční požadavky, návrh entit/databáze) a základní implementace (vytvořený základ vícevrstvé aplikace s entitami, integrací Entity Frameworku Core a migracemi).

Pokud nebudete mít dostatečné množství práce, tak můžete dostat až -5 bodů. Pokud naopak budete mít velký náskok anebo obhájeno, tak až +3 body. Pokud budete mít vše v pořádku (minimum), tak 0 bodů navíc, ale znamená to, že jste úkol splnili.

Poslední týden v semestru (14. týden) -> řádný termín obhajoby bez prezentace před ostatními (jen přede mnou u PC). Na opravných termínech v lednu budete prezentovat přede všemi. -5 až +3 body.

---
## Obecné podmínky pro projekt:

- [ ] Návrh webové aplikace projektu (funkční požadavky, návrh entit/diagramu tříd/databáze). Můžete vytvořit dokument ve Wordu (nemusíte dělat diagramy v EA)

- [ ] Webová aplikace typu ASP.NET Core MVC (verze 10.x nebo vyšší)
  * Aplikace může být vytvořena kompletně v této technologii, nebo lze využít jen pro back-end, např. ve formě Web API.
  * Jedinou povolenou alternativou je vytvoření backendu v Javě (framework Spring MVC) nebo Python (Django MVC), anebo PHP (Laravel -> MVC!!!) - doporučeno jen pokud už s tímto máte zkušenosti! 
    * Projekt i tak musí splňovat podmínky využití MVC, vícevrstvé architektury, objektového programování. Ve webovém projektu se také nesmí objevit ani řádek SQL kódu, aby byl oddělen kód webové stránky a databáze (výjimkou je volání SQL procedur - ujistěte se ale, že víte, co znamená "SQL procedura" a "volání SQL procedury"!) 
      * Pokud tyto podmínky nebudou splněny, tak projekt neprojde 7. týden kontrolou a ani obhajobou!
      
- [ ] Vytvoření vícevrstvé aplikace -> minimálně musí být obsaženy vrstvy Presentation, Application, Infrastructure a Domain.
  * Všechna funkcionalita musí být vytvořena a používána pomocí služeb (services).
  * V Presentation vrstvě se nesmí objevit přímé použití Infrastructure vrstvy (kromě konfigurace).
  * V Controllerech nesmí být kód logicky spadající do nižších vrstev (např. žádný DbContext).

- [ ] Vytvoření databáze technikou Code-First (s migracemi) a její napojení a použití pomocí EntityFrameworkCore (nebo obdobného frameworku).

- [ ] Vhodná implementace Repository pattern (ve správné vrstvě, se správnými interfaces).

- [ ] Projekt musí obsahovat několik entit, popř. ViewModelů/DTO (minimálně 5 - nepočítají se entity z Entity Framework Core a ani z Identity, ani ErrorViewModel). Musí být definováno aspoň jedno propojení entit skrz cizí klíč.

- [ ] Vytvoření Area "Admin", ve které budou uloženy Controllery a View pro správu všech položek v databázi adminem (admin bude moct spravovat i data uživatele, ale nebude jim smět měnit hash hesla).
  * Ve správě položek musí být implementována i editace položek.

- [ ] Bude vyřešena hlavně serverová validace (ale nejlépe i ta klientská).
  * včetně vytvoření jednoho vlastního validačního atributu (tzn. takového, který jste vytvořili sami!).

- [ ] Bude umožněna registrace a přihlášení uživatele pomocí Identity nebo ekvivalentního frameworku -> celkem aspoň 2 role (admin, zákazník/klient, popř. manager/redaktor apod.).
  * Admin má veškerá práva a může spravovat vše.
  * Funkce Managera je taková, že spravuje systém v oblastech, kde interaguje se zákazníky/klienty (např. v případě e-shopu jsou to produkty, objednávky, faktury apod.), ale nemůže měnit kritické vlastnosti systému (uživatele, role, přístupová práva, nastavení webové aplikace apod.).
  * Zákazník/klient využívá systém pro účely, ke kterým je určen (např. v e-shopu nakupuje produkty, vytváří pro sebe objednávky, prohlíží si jen své vlastní objednávky, generuje své faktury apod.).

- [ ] Prvky na stránce by měly být responzivní (pomocí Bootstrap nebo jiné technologie, anebo vlastním řešením). Pro front-end je možné použít jakýkoliv framework (např. Vue, React, Angular, SvelteKit apod.)

- [ ] Vypracovat projekt tak, aby řešení dostatečně pokrylo vybrané téma.
  * Pokud si nejste jistí, tak konzultujte se mnou vypracovaný návrh/řešení ještě před obhajobou.

### Bonusové body

- [ ] nepovinné: upload souboru/obrázku. (bonusový bod)

- [ ] nepovinné: Vytvoření aspoň jednoho unit testu pro zvolenou metodu vybraného Controlleru. Unity testy musí být v samostatném projektu. (bonusový bod)
  * V testované metodě ale musí být použita interakce s databází (jakákoliv, ale nejlépe skrz službu).

- [ ] nepovinné: Logování – výběr aspoň jednoho NuGet package, registrace loggeru a jeho použití v metodách controllerů. (bonusový bod)
