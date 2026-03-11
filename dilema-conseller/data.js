var gameData = {
    "deck": [
        {
            "character": "Cap de Servei de Neurologia",
            "text": "Conseller/a, la IA està suggerint tractaments experimentals a urgències sense explicar-nos com arriba a aquesta conclusió. Els metges ens neguem a aplicar-los a cegues.",
            "leftLabel": "Que sigui transparent",
            "rightLabel": "Tractaments més efectius",
            "leftImpact": { "pacients": -8, "metges": 15, "pressupost": -10, "mediAmbient": 0 },
            "rightImpact": { "pacients": 12, "metges": -18, "pressupost": 5, "mediAmbient": -5 },
            "logText": "Oposició mèdica a les caixes negres de la IA"
        },
        {
            "character": "Directora de Dades del CTTI",
            "text": "Tenim milers d'històries clíniques per entrenar la IA. Si les anonimitzem amb el rigor que demana l'Agència de Protecció de Dades, la IA perdrà un 20% d'eficàcia i ens costarà una fortuna. Què fem?",
            "leftLabel": "Privacitat total",
            "rightLabel": "Prioritzar la salut",
            "leftImpact": { "pacients": 12, "metges": -10, "pressupost": -15, "mediAmbient": -5 },
            "rightImpact": { "pacients": -15, "metges": 12, "pressupost": 10, "mediAmbient": 0 },
            "logText": "Anonimització vs Eficiència"
        },
        {
            "character": "Conselleria d'Acció Climàtica",
            "text": "L'entrenament de la vostra IA consumeix milions de litres d'aigua per refrigerar servidors en plena alerta per sequera. Heu d'aturar-los o prohibirem el reg als pagesos.",
            "leftLabel": "Aturar la tecnologia",
            "rightLabel": "Seguir endavant",
            "leftImpact": { "pacients": -5, "metges": -10, "pressupost": 8, "mediAmbient": 15 },
            "rightImpact": { "pacients": 5, "metges": 8, "pressupost": -10, "mediAmbient": -20 },
            "logText": "Conflicte ecològic per consum hídric"
        },
        {
            "character": "Cap de Dermatologia",
            "text": "La nostra IA és excel·lent pel 80% de la població catalana, però no té gaires dades d'efectes a la pele en minories ètniques. Entrenar-la amb dades externes ens portarà 2 anys de retard i milions d'euros. Esperem que sigui perfecta per a tothom?",
            "leftLabel": "Esperar a la perfecció",
            "rightLabel": "Desplegar-la ja",
            "leftImpact": { "pacients": 10, "metges": -12, "pressupost": -15, "mediAmbient": 5 },
            "rightImpact": { "pacients": -18, "metges": 10, "pressupost": 8, "mediAmbient": -5 },
            "logText": "Dilema d'equitat vs velocitat en dermatologia"
        },
        {
            "character": "CEO de Global-AI Health",
            "text": "Conseller/a, us oferim la nostra infraestructura de diagnòstic gratis durant 3 anys. A canvi, les dades dels pacients catalans passaran pels nostres servidors als EUA per 'millorar el motor'. Acceptem el regal?",
            "leftLabel": "Acceptar el regal",
            "rightLabel": "Desenvolupament local",
            "leftImpact": { "pacients": -12, "metges": 10, "pressupost": 20, "mediAmbient": -8 },
            "rightImpact": { "pacients": 12, "metges": -8, "pressupost": -22, "mediAmbient": 5 },
            "logText": "Sobirania de dades vs Big Tech"
        },
        {
            "character": "Associació de Pacients",
            "text": "L'algoritme de Salut Mental envia avisos de 'risc de depressió' als mòbils abans de passar pel metge. Això crea angoixa. Hem de filtrar aquests avisos?",
            "leftLabel": "Filtrar per humans",
            "rightLabel": "Transparència total",
            "leftImpact": { "pacients": 8, "metges": 12, "pressupost": -5, "mediAmbient": 5 },
            "rightImpact": { "pacients": -15, "metges": -10, "pressupost": 10, "mediAmbient": -5 },
            "logText": "Protecció vs Transparència en salut mental"
        },
        {
            "character": "Sindicat d'Infermeres",
            "text": "Voleu instal·lar tòtems de 'Triatge Intel·ligent' a les entrades: la IA decideix qui passa i qui va a casa segons els símptomes. Això estalvia cues, però els pacients grans se senten abandonats.",
            "leftLabel": "Prioritzar tracte humà",
            "rightLabel": "Desplegar triatge IA",
            "leftImpact": { "pacients": 12, "metges": 15, "pressupost": -15, "mediAmbient": 5 },
            "rightImpact": { "pacients": -15, "metges": -12, "pressupost": 20, "mediAmbient": -8 },
            "logText": "Triatge automàtic vs Atenció humana"
        },
        {
            "character": "Advocat del Departament",
            "text": "Hem tingut el primer error greu d'una IA en una cirurgia. Hem de declarar per llei que la responsabilitat és només del metge per evitar plets milionaris contra el fabricant de software?",
            "leftLabel": "Metge responsable",
            "rightLabel": "Garantia pública",
            "leftImpact": { "pacients": -8, "metges": -18, "pressupost": 12, "mediAmbient": 0 },
            "rightImpact": { "pacients": 12, "metges": 15, "pressupost": -18, "mediAmbient": 0 },
            "logText": "Dilema legal de responsabilitat algorítmica"
        },
        {
            "character": "Alcalde de Tremp",
            "text": "Al Pirineu, en la Catalunya buidada, no ens queden radiòlegs. Volem que la IA diagnostiqui sense revisió humana per evitar que els veïns hagin de conduir 3 hores fins a Barcelona.",
            "leftLabel": "IA com a única opció",
            "rightLabel": "Exigir revisió humana",
            "leftImpact": { "pacients": 12, "metges": -10, "pressupost": 8, "mediAmbient": 8 },
            "rightImpact": { "pacients": -15, "metges": 8, "pressupost": -5, "mediAmbient": -10 },
            "logText": "IA i equitat en el món rural buidat"
        },
        {
            "character": "Cap de Ciberatacs",
            "text": "Hem patit un atac de 'ransomware'. Un grup de hackers ha bloquejat els servidors de la IA d'Urgències i demanen un rescat en Bitcoins per no filtrar dades de pacients.",
            "leftLabel": "Pagar rescat",
            "rightLabel": "No negociar",
            "leftImpact": { "pacients": 5, "metges": 8, "pressupost": -25, "mediAmbient": -5 },
            "rightImpact": { "pacients": -18, "metges": -12, "pressupost": 5, "mediAmbient": 10 },
            "logText": "Crisis de ciberseguretat i segrest de dades"
        },
        {
            "character": "Mare d'un nen malalt",
            "text": "Conseller/a, la IA és eficient amb malalties comunes, però pel meu fill amb una malaltia rara el sistema 'no té dades'. Invertiu 5 milions en un model específic?",
            "leftLabel": "Invertir en minories",
            "rightLabel": "Eficiència agregada",
            "leftImpact": { "pacients": 12, "metges": 8, "pressupost": -15, "mediAmbient": -5 },
            "rightImpact": { "pacients": -10, "metges": -8, "pressupost": 8, "mediAmbient": 5 },
            "logText": "Malalties rares vs Benefici majoritari"
        },
        {
            "character": "Directora de Residència",
            "text": "No trobem personal per atendre els avis. Us proposem robots amb IA que parlen i fan companyia. Estalvieu diners, però les famílies ho veuen fred i deshumanitzat.",
            "leftLabel": "Robots assistencials",
            "rightLabel": "Exigir personal humà",
            "leftImpact": { "pacients": -12, "metges": 15, "pressupost": 15, "mediAmbient": -8 },
            "rightImpact": { "pacients": 15, "metges": -10, "pressupost": -18, "mediAmbient": 5 },
            "logText": "Robots de companyia a residències"
        },
        {
            "character": "Degà de Medicina",
            "text": "Els nous metges depenen tant de la IA que ja no saben diagnosticar sense una pantalla. Prohibim l'ús de la IA als residents de primer any per forçar l'aprenentatge tradicional?",
            "leftLabel": "Prohibir IA novells",
            "rightLabel": "Integració total",
            "leftImpact": { "pacients": -8, "metges": 12, "pressupost": -5, "mediAmbient": 5 },
            "rightImpact": { "pacients": 8, "metges": -15, "pressupost": 8, "mediAmbient": -5 },
            "logText": "Dilema d'aprenentatge MIR"
        },
        {
            "character": "Auditor Europeu",
            "text": "La vostra IA no compleix al 100% amb la nova Llei de la UE. O atureu el projecte 6 mesos per auditar-lo o us arrisqueu a una multa de 50 milions d'euros.",
            "leftLabel": "Aturar i auditar",
            "rightLabel": "Arriscar-se a multa",
            "leftImpact": { "pacients": -15, "metges": -10, "pressupost": -8, "mediAmbient": 10 },
            "rightImpact": { "pacients": 8, "metges": 8, "pressupost": -25, "mediAmbient": -5 },
            "logText": "Xoc amb la regulació europea"
        },
        {
            "character": "Directora de Contractació",
            "text": "Mantenir el nostre equip de programadors d'IA consumeix tot el pressupost de personal. Una consultora privada s'ofereix a gestionar-ho tot més barat, però perdrem el control sobre els algorismes.",
            "leftLabel": "Externalitzar gestió",
            "rightLabel": "Gestió 100% pública",
            "leftImpact": { "pacients": -8, "metges": -8, "pressupost": 18, "mediAmbient": 5 },
            "rightImpact": { "pacients": 12, "metges": 8, "pressupost": -18, "mediAmbient": -5 },
            "logText": "Externalització vs Gestió pública"
        },
        {
            "character": "Comitè de Bioètica",
            "text": "Hem d'implementar una IA que prediu amb un 99% d'exactitud quan un pacient terminal està a punt de morir. Permet avisar les famílies per acomiadar-se, però podria recomanar aturar tractaments abans d'hora.",
            "leftLabel": "Implementar amb avisos",
            "rightLabel": "Prohibir IA final vida",
            "leftImpact": { "pacients": 15, "metges": -10, "pressupost": 8, "mediAmbient": -5 },
            "rightImpact": { "pacients": -15, "metges": 12, "pressupost": -10, "mediAmbient": 5 },
            "logText": "IA en cures pal·liatives"
        }
    ],

    "gameOvers": {
        "pacients": {
            "low": {
                "headline": "Pacients sense confiaça, model rebutjat",
                "reason": "Els ciutadans han perdut tota la confiança en la sanitat algorítmica. Et destitueixen després d'una onada de desempadronaments digitals mèdics."
            },
            "high": {
                "headline": "Aïllament Digital, Paràlisi i Estancament",
                "reason": "Has protegit tantissim els pacients fins a extrems inversemblants que no es pot creuar ni un sol tipus de raonament a cap IA. Atur d'innovació ineficaç absolut."
            }
        },
        "metges": {
            "low": {
                "headline": "Vaga General Mèdica Indefinida al Departament",
                "reason": "Els professionals et bloquegen la conselleria negant-se a emprar sistemes robòtics cècs que van contra el bon judici sanitari humà de tota la vida."
            },
            "high": {
                "headline": "Sexe Maquinal: Els Metges perden el Criteri al Rerevisor",
                "reason": "Dependència absoluta; per culpa de que tot ho feien les teves pantalles els facultatius obliden el criteri, en fallar una connexió 12 minuts han hagut errors de diagnòstic letals sense precedència."
            }
        },
        "pressupost": {
            "low": {
                "headline": "Bancarrota Pública per Software Il·limitat",
                "reason": "Tens a Catalunya endeutada 2 dècades per culpa d'haver finançat dany corporatiu capficant els grans servidors, no heu deixat calers ni pels cirurgians i t'acusen penalment de desviament."
            },
            "high": {
                "headline": "La Mà a la Caixa i Model No Executat",
                "reason": "Amb l'afany estalviador vas aturar tot canvi de modernitat a la Sanitat Pública perdent gran oportunitat d'estat de Benestar al S-XX2 per evitar el tall climàtic. Els diners reposen però tu surts del govern."
            }
        },
        "mediAmbient": {
            "low": {
                "headline": "La IA s'ho Ha Begut Tot. Judici Climàtic",
                "reason": "Evaporació sense escrúpols i ús massiu d'aire condicionat. El Model algorítmic s'emporta tota l'energia de primària i aigua d'un poble sencer, provocant denúncies ciutadanes massives en temps de sequera de no retorn."
            },
            "high": {
                "headline": "Medicina Lenta d'Autarquies Biodegradables",
                "reason": "Per assegurar la petjada 0 has degradat completament la capacitat computacional diagnòstica cap a respostes que tringuen 48h menystenint salvaments greus d'urgències constants. Extremisme considerat perillós ineficàcia."
            }
        },
        "SUCCESS": {
            "win": {
                "headline": "Jubilació d'Honor i Mandat Complet",
                "reason": "Has aconseguit completar el teu mandat de 16 decisions sense que el sistema col·lapsi. Et retires amb honors per deixar pas a una nova generació de gestors, havent establert les bases de la IA a Catalunya."
            }
        }
    }
};
