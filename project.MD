# El Mandat — Projecte de Joc Ètic sobre IA i Sanitat

## Context Acadèmic

Aquest projecte forma part d'una **assignatura d'Ètica** aplicada a la tecnologia i la intel·ligència artificial. L'objectiu és generar un debat entre alumnes sobre els dilemes ètics que comporta el desplegament de sistemes d'IA a la sanitat pública catalana. El joc serveix com a eina pedagògica per evidenciar que **no existeix cap decisió perfecta**: tot benefici té un cost, i governar implica gestionar compromisos impossibles.

---

## Descripció General

**"El Mandat"** és un joc web interactiu estil *Reigns* on l'alumne es posa ala pell de nou/nova **Conseller/a de Salut de la Generalitat de Catalunya**. Ha de prendre **16 decisions seqüencials** sobre la implementació de la IA a la sanitat, equilibrant 4 eixos ètics representats per barres visuals. Si qualsevol barra arriba al 0% o al 100%, el mandat s'acaba prematurament (cessament). Si arriba al torn 16, obté un **Perfil Ètic** que defineix el seu estil de govern.

**Objectiu pedagògic:** Després de jugar, els alumnes comparen els seus perfils i decisions, obrint un debat sobre quins valors han prioritzat i per què. Es convida a jugar més d'una vegada per descobrir perfils alternatius i reflexionar sobre les conseqüències de cada camí.

---

## Tecnologia

- **Desplegament estàtic:** HTML + CSS + JS vanilla. Sense backend, sense base de dades. Es pot desplegar a GitHub Pages, Netlify, o qualsevol servidor estàtic.
- **Arxius principals:**
  - `index.html` — Estructura de les 3 pantalles (intro, joc, final).
  - `styles.css` — Estils amb tema fosc, glassmorphism, animacions.
  - `app.js` — Lògica del joc, gestió d'estat, renderitzat.
  - `data.js` — **Totes les dades editables** del joc (cartes, impactes, perfils, textos de Game Over).

---

## Els 4 Eixos Ètics (Barres)

Cada eix comença al **50%**. Les decisions mouen les barres cap amunt o cap avall. Si una barra toca el **0%** o el **100%**, el joc acaba immediatament (cessament).

### 1. Pacients (La Ciutadania)
- **Abast:** Qualitat del servei, privacitat i humanització.
- **Significat:** Mesura la confiança de la població en el sistema sanitari digital. Inclou la percepció de tracte humà, la protecció de dades personals i la qualitat real del servei rebut.
- **Game Over 0%:** La ciutadania ha perdut tota confiança. Protestes massives contra la deshumanització sanitària.
- **Game Over 100%:** S'ha promès tot als pacients. El sistema és insostenible perquè s'han satisfet totes les demandes sense considerar costos ni viabilitat.

### 2. Metges (El Personal Sanitari)
- **Abast:** Autonomia professional, càrrega de treball i transparència.
- **Significat:** Mesura el suport i la satisfacció del col·lectiu mèdic. Inclou la seva capacitat de mantenir el criteri clínic propi, la càrrega laboral que imposa la tecnologia i la claredat sobre com funcionen els algoritmes.
- **Game Over 0%:** Vaga general mèdica. Els professionals senten que han estat substituïts per màquines sense cap transparència.
- **Game Over 100%:** Els metges tenen poder absolut sobre la tecnologia. Bloquegen qualsevol innovació que no els beneficiï directament.

### 3. Pressupost (Finances Públiques)
- **Abast:** Viabilitat econòmica i gestió de fons públics.
- **Significat:** Mesura la salut financera del Departament de Salut. Inclou el cost d'infraestructura, llicències, formació i el retorn d'inversió de la IA.
- **Game Over 0%:** Bancarrota del Departament. No hi ha diners per a res, ni IA ni assistència bàsica.
- **Game Over 100%:** Superàvit poc ètic. S'ha retallat tant en serveis i personal que els diners sobren però el sistema no funciona.

### 4. Medi Ambient (Sostenibilitat)
- **Abast:** Cost material, energètic i social.
- **Significat:** Mesura l'impacte ambiental i social de la infraestructura tecnològica. Inclou el consum energètic dels centres de dades, els residus electrònics i l'impacte social de la digitalització.
- **Game Over 0%:** Escàndal ecològic. Els centres de dades consumeixen més energia que hospitals sencers. Desastre mediambiental.
- **Game Over 100%:** Paralització tecnològica. S'han imposat tantes restriccions ambientals que la IA és pràcticament inutilitzable.

---

## Mecànica del Joc

### Flux de Joc
1. **Pantalla d'Inici:** Presentació del rol, explicació dels 4 eixos i botó "Acceptar el Càrrec".
2. **Pantalla de Joc (16 torns):** Cada torn presenta una carta amb un dilema i dues opcions (esquerra / dreta). Cada opció afecta les 4 barres de forma diferent. L'alumne decideix prement els botons de fletxa (tant a mòbil com a PC).
3. **Pantalla Final:** Mostra el resultat, el perfil ètic, un resum de decisions i un enllaç al qüestionari extern.

### Controls
- **PC:** Botons clicables + tecles fletxa esquerra/dreta del teclat.
- **Mòbil:** Botons clicables (NO swipe).

### Estructura de les Cartes
Cada carta del `data.js` té:
```javascript
{
  id: "identificador_únic",
  character: "Qui parla (exemple: Cap de Servei, Directora de Dades...)",
  text: "Text del dilema presentat al jugador.",
  leftLabel: "Text del botó esquerra (Opció A)",
  rightLabel: "Text del botó dreta (Opció B)",
  leftImpact: { pacients: X, metges: X, pressupost: X, mediAmbient: X },
  rightImpact: { pacients: X, metges: X, pressupost: X, mediAmbient: X },
  logText: "Resum curt de la decisió per al registre final"
}
```
- Els impactes són valors numèrics (positius o negatius, normalment entre -15 i +15).
- Tota carta hauria d'afectar almenys 2 eixos per crear tensions ètiques.

### Ordre de les Cartes
Les 16 cartes es presenten **sempre en el mateix ordre** per a tots els jugadors. Això permet comparar directament les decisions entre alumnes durant el debat posterior.

---

## Finals del Joc

### A) Final Prematur — Cessament (Game Over)
- **Quan:** Una barra arriba a 0% o 100% abans del torn 16.
- **Narrativa:** El Conseller/a ha estat destituït. Es mostra:
  - Titular de premsa fictici relacionat amb la causa del cessament.
  - Raó de la destitució.
  - Gràfic ètic final (estat de les 4 barres).
  - Registre de les últimes decisions.
- **Missatge motivador:** Incitar el jugador a tornar a jugar per intentar arribar al final i obtenir el seu perfil ètic complet.
  - Exemple: *"No has completat la legislatura. Torna-ho a intentar per descobrir el teu perfil ètic!"*

### B) Final Natural — Fi de Legislatura (Torn 16 completat)
- **Quan:** L'alumne completa les 16 decisions sense que cap barra toqui els extrems.
- **Narrativa:** El mandat ha acabat. Es mostra:
  - Titular de premsa fictici basat en el perfil.
  - **Perfil Ètic** amb nom i descripció acadèmica.
  - Gràfic ètic final.
  - Registre de totes les decisions.
  - Enllaç al qüestionari.

---

## Perfils Ètics (Final Natural)

Els perfils es determinen analitzant la barra **més alta** i la barra **més baixa** al final dels 16 torns. Estan redactats des d'una perspectiva d'assignatura d'Ètica, fomentant la reflexió sense judicis morals absoluts.

### El Tecnòcrata Eficient
- **Condició:** Pressupost ⬆️ / Pacients ⬇️
- **Descripció:** Has optimitzat recursos i la tecnologia funciona amb eficiència, però la ciutadania percep una sanitat freda i deshumanitzada. Des de l'ètica utilitarista, has maximitzat el benefici agregat, però a costa dels drets individuals i la dignitat del pacient.
- **Pregunta de reflexió:** *L'eficiència justifica la pèrdua de tracte humà?*

### L'Idealista Humanista
- **Condició:** Pacients ⬆️ / Pressupost ⬇️
- **Descripció:** Has protegit la privacitat, el consentiment informat i el tracte humà per sobre de tot. El Departament, però, no pot sostenir econòmicament el model que has creat. Des de l'ètica deontològica, has respectat els principis fonamentals, però la sostenibilitat del sistema és qüestionable.
- **Pregunta de reflexió:** *Es pot mantenir un sistema èticament impecable si és econòmicament inviable?*

### El Visionari Verd
- **Condició:** Medi Ambient ⬆️ / Metges ⬇️
- **Descripció:** Has creat una infraestructura tecnològica sostenible i respectuosa amb el planeta, però els professionals sanitaris estan sobrecarregats amb eines lentes i poc potents. Des de l'ètica ambiental, has prioritzat les generacions futures, però a costa del benestar laboral present.
- **Pregunta de reflexió:** *Fins on podem sacrificar l'eficiència present per la sostenibilitat futura?*

### El Pragmàtic de l'Equilibri
- **Condició:** Totes les barres entre 35% i 65%
- **Descripció:** No has destacat en cap àmbit, però has aconseguit mantenir totes les forces en tensió controlada. Des de l'ètica del compromís polític, has demostrat habilitat negociadora, tot i que cap sector està plenament satisfet amb el teu govern.
- **Pregunta de reflexió:** *L'equilibri és un èxit o una forma d'evitar decisions valentes?*

### El Líder Paternalista
- **Condició:** Metges ⬆️ / Pacients ⬇️
- **Descripció:** Has aconseguit el suport total de la professió mèdica, però has imposat la tecnologia sense comptar amb l'opinió dels ciutadans. Des de l'ètica del paternalisme, has confiat en l'expert per sobre de l'autonomia del pacient.
- **Pregunta de reflexió:** *Qui ha de decidir sobre la salut del pacient: l'expert o el propi pacient?*

### L'Auster Responsable
- **Condició:** Pressupost ⬆️ / Medi Ambient ⬇️
- **Descripció:** Has sanejat les finances públiques, però a costa d'una infraestructura tecnològica que consumeix recursos naturals de forma insostenible. Has prioritzat l'eficiència econòmica immediata per sobre de la responsabilitat amb el planeta.
- **Pregunta de reflexió:** *El benefici econòmic a curt termini pot justificar l'impacte ambiental a llarg termini?*

---

## Pantalla d'Inici — Texts Definitius

- **Títol:** El Mandat (mida petita, estil uppercase amb gradient)
- **Subtítol:** *(eliminat)*
- **Descripció:**
  > Acabes de ser nomenat/da **Conseller/a de Salut**.
  >
  > Gestiona la IA a la sanitat equilibrant quatre sectors clau. Si un sector arriba a l'extrem (màxim o mínim beneficiat), el sistema s'esfondra i tu amb ell.
- **4 Caixes de forces (grid 2x2):**
  - Pacients — Qualitat servei, privacitat i humanització
  - Metges — Autonomia, càrrega de treball i transparència
  - Pressupost — Viabilitat i gestió de fons públics
  - Medi Ambient — Cost material, energètic i social
- **Botó:** "Acceptar el Càrrec"

---

## Pantalla de Game Over / Final — Elements

### En cas de Cessament (prematur):
1. Titular de premsa (fictici, dramàtic)
2. Raó del cessament
3. Gràfic de les 4 barres finals
4. Registre de decisions
5. Missatge motivador per tornar a jugar
6. Botó "Tornar a Jugar"

### En cas de Final de Legislatura (torn 16):
1. Titular de premsa (fictici, descriptiu del perfil)
2. **Nom del Perfil Ètic**
3. **Descripció del Perfil** amb pregunta de reflexió
4. Gràfic de les 4 barres finals
5. Registre de decisions
6. Enllaç al qüestionari extern (Google Forms)
7. Botó "Tornar a Jugar"

---

## Estil Visual

- **Tema:** Fosc amb glassmorphism (fons amb blobs animats, transparències).
- **Tipografia:** Outfit (títols) + Inter (cos).
- **Iconografia:** SVG line-icons (sense emojis).
- **Colors principals:** `--primary: #00d2ff`, `--accent: #ff0076`, `--green: #10b981`.
- **Animacions:** Fade-in de cartes, shake de barres en perill, hover/active als botons.
- **Responsiu:** Optimitzat per mòbil (max-width 500px), funcional a desktop.

---

## Notes Importants

1. **Sense SPI-Salut:** No es menciona cap producte comercial concret. Es parla genèricament d'IA a la sanitat.
2. **Sense emojis:** Tots els indicadors visuals són SVGs estilitzats.
3. **Dades editables:** Tot el contingut narratiu (cartes, impactes, perfils, textos de Game Over) viu a `data.js` per facilitar l'edició sense tocar el codi.
4. **16 preguntes fixes:** Ordre constant per a tots els jugadors, per permetre comparació directa durant el debat.
5. **Incitació a rejugar:** El final prematur ha de motivar l'alumne a tornar-ho a intentar per obtenir el seu perfil ètic complet.
6. **Qüestionari extern:** Placeholder de Google Forms per a la recollida de dades qualitatives posteriors.
