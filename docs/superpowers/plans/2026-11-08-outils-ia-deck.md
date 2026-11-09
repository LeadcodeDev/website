# Deck « Outils IA » Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer le deck de 12h `apps/slides/slides/outils-ia`, schémas d'abord, texte minimal, avec notes de présentateur.

**Architecture:** Un seul `index.tsx`, organisé en sections. Chaque page est décrite par une entrée `{ page, note }` dans un tableau `deck`. `export default` et `export const notes` en dérivent, donc l'alignement pages/notes est structurel. Les schémas sont en flexbox et SVG inline, à partir de briques communes définies en tête de fichier.

**Tech Stack:** `@open-slide/core` 2, React 19, TypeScript. Aucune dépendance ajoutée.

**Spec:** `docs/superpowers/specs/2026-11-08-outils-ia-deck-design.md`

## Global Constraints

- Entrée unique : `apps/slides/slides/outils-ia/index.tsx`. Aucun fichier frère, ni `README.md` dans le dossier du deck.
- Ne pas toucher `package.json`, `open-slide.config.ts`, ni les autres decks. Aucune dépendance ajoutée.
- Canvas 1920×1080, valeurs en pixels, marges de contenu 110 px, contenu ≤ 840 px de haut. Pas de `overflow` scroll.
- Tokens : `design` const (`bg #fafaf9`, `text #1c1917`, `accent #EF7809`, display `"JetBrains Mono"`, body `"Inter"`, `radius 4`), repris de `git show HEAD:apps/slides/slides/outils-ia/index.tsx` lignes 1 à 120.
- Texte en français. Une phrase par bloc, ≤ 6 mots par étiquette de schéma quand c'est possible.
- Une page = un schéma. Une page de texte seul est interdite, sauf la consigne d'un atelier.
- `meta.createdAt` : sortie de `node -e "console.log(new Date().toISOString())"` exécutée juste avant l'écriture.
- Aucun chiffre de prix, de score ou de benchmark inventé. Les courbes et histogrammes sont qualitatifs et marqués « illustration ».
- Famille Claude : Haiku, Sonnet, Opus, Fable/Mythos. « Mestier » n'apparaît nulle part.
- Planning : jour 1 matin 3h30 de théorie + 30 min de vérification d'environnement, après-midi 4h de TP ; jour 2 : 1h de bilan + 3h de pratique.
- Commits : conventional commits, scope `slides`, message court, en anglais comme l'historique (`feat(slides): …`).

## Review Focus

- Une page dépasse 1080 px et se fait rogner : vérifier chaque page à l'écran, pas seulement au build.
- Les notes se décalent d'une page après un ajout ou un déplacement : `notes` doit dériver du même tableau que `export default`.
- Une page devient un mur de texte (> 40 mots hors schéma) : le critère « peu de texte » n'est pas tenu.
- Un prix, un score ou une date de modèle inventé apparaît sur un schéma : remplacer par une indication qualitative.
- `courses/outils-ia/README.md` décrit encore l'ancien deck de 85 slides et ses numéros de bloc.

---

## File Structure

| Fichier | Rôle |
|---|---|
| `apps/slides/slides/outils-ia/index.tsx` | Tout le deck : `design`, briques, sections, `deck`, `meta`, `default`, `notes` |
| `courses/outils-ia/README.md` | Mise à jour des numéros de slides et du chemin |

Sections balisées dans `index.tsx`, dans cet ordre : `// ─── Design`, `// ─── Briques`, `// ─── Ouverture`, `// ─── J1 matin : 1 Bases` … `// ─── J2 : 3 Pratique`, `// ─── Deck`.

## Vérification commune (référencée « Vérif »)

1. `cd apps/slides && pnpm exec tsc --noEmit -p .` : attendu, aucune erreur.
2. `pnpm --filter @explainer/slides build` : attendu, sortie sans erreur.
3. `pnpm --filter @explainer/slides dev`, ouvrir le deck, parcourir les pages de la tâche : aucune page rognée en bas, aucun texte qui touche le bord, schéma lisible à 3 m (étiquettes ≥ 22 px).

---

### Task 1: Squelette, design et briques de schéma

**Files:**
- Delete (déjà supprimés dans le working tree) : `apps/slides/slides/outils-ia/{index.tsx,assets/*}`
- Create: `apps/slides/slides/outils-ia/index.tsx`

**Interfaces:**
- Produces (tous dans `index.tsx`) :
  - `export const design: DesignSystem`, `export const meta: SlideMeta` (`title: 'Outils IA'`).
  - `type Entry = { page: Page; note?: string }` et `const deck: Entry[]`. `export default deck.map((e) => e.page) satisfies Page[]`, `export const notes = deck.map((e) => e.note)`.
  - `Slide({ section, children }: { section: string; children: ReactNode })` : fond, `Footer` avec numéro de page, marges 110 px.
  - `Title({ children })` (page heading 64 px), `Tag({ text })` (étiquette de section).
  - `Box({ label, sub?, tone?, w?, h? }: { label: string; sub?: string; tone?: 'neutral' | 'accent' | 'muted' | 'warn'; w?: number; h?: number })`.
  - `Arrow({ dir, label?, dashed? }: { dir: 'right' | 'down' | 'left' | 'up'; label?: string; dashed?: boolean })`.
  - `Loop({ steps, center? }: { steps: string[]; center?: string })` : boucle circulaire en SVG.
  - `Timeline({ marks }: { marks: { at: number; label: string; tone?: 'neutral' | 'accent' | 'muted' }[] })`, `at` en 0..1.
  - `Gauge({ value, label }: { value: number; label: string })`, `value` en 0..1.
  - `Exercise({ n, title, steps }: { n: number; title: string; steps: string[] })` : atelier, étapes numérotées.
  - `Break({ n, title, sub }: { n: string; title: string; sub: string })` : page de section.

- [ ] **Step 1: Capturer l'état de départ**

Run: `cd apps/slides && git ls-files slides/outils-ia && ls slides`
Expected: les fichiers de l'ancien deck sont listés par git mais absents du disque.

- [ ] **Step 2: Créer `index.tsx` avec les briques et un deck de 2 pages de test (`Cover`, `BriquesDemo`)**

`BriquesDemo` affiche chaque brique une fois. Reprendre `design`, `page`, `Footer`, `Tag` de l'ancien fichier (lignes 1 à 120 de `git show HEAD:…/index.tsx`), sans les constantes `ARCHIVE_*` ni les images.

- [ ] **Step 3: Vérif**

Expected: build OK, `BriquesDemo` montre les 8 briques sans débordement, le numéro de page du `Footer` s'affiche.

- [ ] **Step 4: Vérifier que `default` et `notes` dérivés sont acceptés par le framework**

Ajouter `note: 'test'` à `Cover`, lancer `pnpm dev`, ouvrir le tiroir de notes sur la page 1.
Expected: la note « test » s'affiche. Si elle ne s'affiche pas, passer à deux littéraux (`export default [...]` et `export const notes = [...]`) dans toute la suite, et le noter dans le plan.

- [ ] **Step 5: Retirer la note de test, commit**

```bash
git add apps/slides/slides/outils-ia/index.tsx
git commit -m "feat(slides): scaffold the outils-ia deck with diagram bricks"
```

---

### Task 2: Ouverture et fil du module

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `Ouverture`)

**Interfaces:**
- Consumes: `Slide`, `Break`, `Box`, `Arrow`, `Timeline`.
- Produces: pages `Cover`, `Agenda`, `Rhythm`, ajoutées au début de `deck`.

- [ ] **Step 1: `Cover`** : titre « Outils IA », sous-titre « Comprendre, piloter, contrôler », mention « Bachelor 1 · 12h ». Une page de titre n'a pas de schéma.
- [ ] **Step 2: `Agenda`** : `Timeline` des 4 créneaux (J1 matin 3h30 + 30 min d'env, J1 après-midi 4h, J2 1h, J2 3h). Étiquettes : « Comprendre », « Environnement », « Fil rouge : API Go », « Bilan », « Pratique ».
- [ ] **Step 3: `Rhythm`** : schéma « 3 gestes du cours » : `Box` « Comprendre » → `Box` « Spécifier » → `Box` « Contrôler », avec `Arrow`.
- [ ] **Step 4: Écrire `note` pour chaque page** (annonce du planning, ce qu'on ne fera pas : pas de maths).
- [ ] **Step 5: Vérif, puis commit**

```bash
git commit -am "feat(slides): add the opening pages of the outils-ia deck"
```

---

### Task 3: Thème 1, Bases de l'IA et modèle / LLM / agent

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 matin : 1 Bases`)

**Interfaces:**
- Consumes: `Break`, `Slide`, `Box`, `Arrow`, `Loop`.
- Produces: `BasesBreak`, `NextToken`, `Nested`, `AgentAnatomy`, `AgentLoop`.

- [ ] **Step 1: `BasesBreak`** : `Break n="1" title="Les bases"`.
- [ ] **Step 2: `NextToken`** : chaîne `Box` « Texte » → « Tokens » → « Modèle » → « Token suivant », avec une boucle de retour `Arrow dashed` « on recommence ».
- [ ] **Step 3: `Nested`** : trois rectangles emboîtés `Modèle ⊂ LLM ⊂ Agent`, chacun avec une phrase de 6 mots maximum (« Une fonction apprise », « Un modèle qui parle », « Un LLM qui agit »).
- [ ] **Step 4: `AgentAnatomy`** : `Box` « LLM » au centre, 3 `Box` autour (« Outils », « Mémoire », « Objectif »), `Arrow` vers le centre.
- [ ] **Step 5: `AgentLoop`** : `Loop steps={['Observer','Décider','Agir','Vérifier']} center="Agent"`.
- [ ] **Step 6: notes, Vérif, commit** (`feat(slides): add the AI basics section`)

---

### Task 4: Thèmes 2 et 3, date de coupure et modèles « overkill »

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (sections `J1 matin : 2 Coupure` et `3 Modèles`)

**Interfaces:**
- Consumes: `Break`, `Timeline`, `Box`, `Arrow`, `Gauge`.
- Produces: `CutoffBreak`, `CutoffTimeline`, `CutoffBlind`, `CutoffFix`, `ModelsBreak`, `Family`, `Triangle`, `Diminishing`, `TaskGrid`.

- [ ] **Step 1: `CutoffTimeline`** : `Timeline` « Données d'entraînement » → repère « Date de coupure » → « Aujourd'hui », zone après la coupure hachurée « Aveugle ».
- [ ] **Step 2: `CutoffBlind`** : deux colonnes : question sur un fait récent, réponse du modèle (`Box tone="warn"` « Réponse sûre d'elle, mais périmée »). Pas de fait réel daté.
- [ ] **Step 3: `CutoffFix`** : `Box` « Modèle » reçoit trois flèches : « Recherche web », « Documents fournis », « Outils ».
- [ ] **Step 4: `Family`** : quatre `Box` en escalier montant : « Haiku », « Sonnet », « Opus », « Fable / Mythos », avec un seul mot d'usage chacun : « Rapide », « Équilibré », « Profond », « Frontière ». Titre : « Chaque modèle a son usage ».
- [ ] **Step 5: `Triangle`** : triangle SVG avec les sommets « Coût », « Vitesse », « Intelligence ». Légende : « On n'obtient jamais les trois ».
- [ ] **Step 6: `Diminishing`** : courbe SVG « Qualité » selon « Puissance du modèle », qui s'aplatit, repère « Ici, assez bon », étiquette « illustration ». Titre : « La course à la puissance perd son sens ».
- [ ] **Step 7: `TaskGrid`** : grille 3 lignes (« Classer des tickets », « Résumer une réunion », « Refactorer un module ») × 4 colonnes de modèles, pastille « adapté » sur la bonne case. Qualitatif uniquement.
- [ ] **Step 8: notes (dont « citer la date de coupure du modèle utilisé, à vérifier le jour J »), Vérif, commit** (`feat(slides): add cutoff and model families sections`)

---

### Task 5: Thème 4, le LLM ne connaît pas votre contexte métier

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 matin : 4 Contexte`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`, `Gauge`, `Slide`.
- Produces: `ContextBreak`, `KnowledgeGap`, `EmptyContext`, `MemoryLayers`, `DataQuality`.

- [ ] **Step 1: `KnowledgeGap`** : deux cercles SVG qui se chevauchent peu : « Ce que le modèle sait » (public) et « Votre entreprise » (privé), la zone privée marquée « Il ne le voit pas ».
- [ ] **Step 2: `EmptyContext`** : page volontairement presque vide : titre « Votre contexte métier », un grand cadre pointillé vide, mention « À remplir ensemble plus tard ». Note : ce cadre est itéré à la fin du jour 2 (renvoi depuis `Recap2`, Task 10).
- [ ] **Step 3: `MemoryLayers`** : trois couches empilées : « Fenêtre de contexte (oublie à la fin) », « Fichiers d'instructions (relus à chaque session) », « Mémoire persistante (conservée) ».
- [ ] **Step 4: `DataQuality`** : deux colonnes « Donnée sale » (champs libres, doublons, formats mélangés) et « Donnée propre » (schéma, identifiants, source unique), avec une flèche « Le LLM ne répare pas ça ». Exemple tiré du projet Go : `status` libre contre `available | borrowed | maintenance | lost`.
- [ ] **Step 5: notes, Vérif, commit** (`feat(slides): add the business context section`)

---

### Task 6: Thème 5, dérives de la hype et exemples concrets

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 matin : 5 Dérives`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`.
- Produces: `HypeBreak`, `HypeNonsense`, `CostBars`, `DecisionTree`, `ExampleTicket`, `ExampleMeeting`.

- [ ] **Step 1: `HypeNonsense`** : citation en grand « Mettre de l'IA pour en mettre n'a aucun sens », sous elle trois pastilles de dérives : « Chatbot sur tout », « LLM pour un `if` », « Agent sans objectif ».
- [ ] **Step 2: `CostBars`** : histogramme qualitatif à deux barres : « Règle déterministe » (courte) et « Appel LLM sur chaque requête » (très haute), échelle sans unité, étiquette « illustration ».
- [ ] **Step 3: `DecisionTree`** : arbre : « La règle est-elle écrivable ? » → oui : « Code » ; non : « Une erreur est-elle tolérable ? » → oui : « IA + contrôle » ; non : « Humain ». Titre : « Faut-il de l'IA ? ».
- [ ] **Step 4: `ExampleTicket`** : flux horizontal : « Ticket reçu » → « Identifier le client » → « Base de connaissance » → « Documents liés » → « Brouillon de réponse » → « Humain valide ». Les deux étapes de recherche en `tone="accent"`.
- [ ] **Step 5: `ExampleMeeting`** : flux : « Audio » → « Diarisation » → « Résumé » → deux branches « Opportunités commerciales » et « Actions », la seconde menant à « Ticket / roadmap ».
- [ ] **Step 6: notes, Vérif, commit** (`feat(slides): add the hype drift section with two worked examples`)

---

### Task 7: Thème 6, MCP contre un simple appel d'API

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 matin : 6 MCP`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`.
- Produces: `McpBreak`, `ApiVsMcp`, `McpAnatomy`, `McpCall`, `McpLimits`.

- [ ] **Step 1: `ApiVsMcp`** : deux schémas côte à côte. Gauche : 3 clients IA reliés à 3 services par 9 flèches, légende « N × M intégrations ». Droite : 3 clients → un nœud « Protocole MCP » → 3 services, légende « N + M ». Titre : « Pourquoi pas juste une API ? ».
- [ ] **Step 2: `McpAnatomy`** : « Client (l'application IA) » ↔ « Serveur MCP » avec trois sorties : « Outils », « Ressources », « Prompts ». Le serveur se branche sur « Votre service (API Go) ».
- [ ] **Step 3: `McpCall`** : diagramme de séquence : « Client » demande « Quels outils ? », le serveur renvoie la liste décrite, le LLM choisit, appel `emprunter(item)`, résultat. Réutiliser le style de séquence d'appel d'outil de l'ancien deck (`git show HEAD:… | grep -n "AgentTools"`).
- [ ] **Step 4: `McpLimits`** : deux colonnes « MCP apporte » (« Découverte des outils », « Schéma lisible par le modèle », « Un serveur, plusieurs clients ») et « MCP ne règle pas » (« Les droits », « La validation des entrées », « La confiance dans la réponse »).
- [ ] **Step 5: notes (un MCP est un contrat d'accès, pas de la magie), Vérif, commit** (`feat(slides): add the MCP section`)

---

### Task 8: Thème 7, marché du travail et esprit critique

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 matin : 7 Marché`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`.
- Produces: `MarketBreak`, `Staircase`, `ValueShift`, `ValuePillars`, `CriticalMind`, `Recap1`.

- [ ] **Step 1: `Staircase`** : escalier à 3 marches : « Bibliothèques », « Frameworks », « IA », chacune avec « ce qu'on ne réécrit plus ». Titre : « Un outil de plus, pas une rupture de nature ».
- [ ] **Step 2: `ValueShift`** : balance SVG inclinée : plateau gauche « Exécuter » qui monte, plateau droit « Comprendre, cadrer, décider » qui descend. Légende : « L'exécutant, c'est l'IA ».
- [ ] **Step 3: `ValuePillars`** : quatre piliers : « Business et enjeux », « Vision produit », « Spécifier les chantiers », « Relation client B2C / B2B » ; le dernier en `tone="accent"`.
- [ ] **Step 4: `CriticalMind`** : un `Box` « Réponse de l'IA » avec trois sorties « Accepter », « Questionner », « Refuser » ; « Questionner » est en accent. Titre : « Ne pas dire oui à tout ».
- [ ] **Step 5: `Recap1`** : une ligne de 7 pastilles (un mot par thème) pour fermer la théorie. Ensuite, vérification d'environnement (Task 9).
- [ ] **Step 6: notes, Vérif, commit** (`feat(slides): add the job market section`)

---

### Task 9: Vérification de l'environnement (30 min)

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 env`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`, `Exercise`.
- Produces: `EnvBreak`, `EnvChecklist`, `EnvStack`.

- [ ] **Step 1: `EnvStack`** : schéma des briques du projet : « Go », « PostgreSQL », « IAM (FerrisKey ou Keycloak) », « Docker Compose », reliées à « API ».
- [ ] **Step 2: `EnvChecklist`** : `Exercise n={1} title="Votre environnement"`, étapes : cloner `LeadcodeDev/ai-formation-ynov-project`, lancer `docker compose up` (chemin `deploy/`), obtenir un jeton de l'IAM, appeler `GET /healthz`. Les étapes sont à confirmer contre le README du dépôt Go au moment de l'écriture ; si elles diffèrent, suivre le README.
- [ ] **Step 3: notes (minuteur de 30 min, qui est bloqué lève la main), Vérif, commit** (`feat(slides): add the lab environment check`)

---

### Task 10: TP jour 1, méthodologie et démonstration

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `J1 après-midi : Méthodo`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`, `Loop`, `Gauge`, `Exercise`.
- Produces: `MethodBreak`, `ProductVision`, `SpecDriven`, `AgenticLoop`, `ContextWindow`, `Delegation`, `ZeroTrust`, `DemoPostulate`, `TpBrief`, `TpArchitecture`, `TpTraps`, `TpSteps`.

- [ ] **Step 1: `ProductVision`** : schéma « Problème → Utilisateur → Valeur → Périmètre » (« Pas seulement technique »).
- [ ] **Step 2: `SpecDriven`** : flux « Idée → Questions → Spec → Plan → Code », avec une pastille « `superpowers:brainstorming` » sur « Questions ».
- [ ] **Step 3: `AgenticLoop`** : orchestrateur au centre, trois sous-agents autour, flèches « tâche » aller et « résultat » retour. Titre : « Séparer pour mieux régner ».
- [ ] **Step 4: `ContextWindow`** : `Gauge` de remplissage du contexte, trois barres : « Une seule fenêtre, tout mélangé » (pleine) contre « Un contexte par sous-agent » (légère). Définition en une ligne : « Le contexte = tout ce que le modèle voit ».
- [ ] **Step 5: `Delegation`** : cycle TDD `Loop steps={['Test rouge','Code','Test vert','Refactor']}`, légende « On délègue le code, pas le jugement ».
- [ ] **Step 6: `ZeroTrust`** : flèche « Sortie de l'IA » traversant trois portes « Tests », « Revue », « Garde-fous (validation, droits) ». Titre : « Zéro confiance, programmation défensive ».
- [ ] **Step 7: `DemoPostulate`** : **une seule page** pour la démo live : à gauche « Issue simple sur FerrisKey » ; au centre « Spec → boucle → TDD » ; à droite « Code livré » ; les trois points de contrôle humain marqués d'une pastille. Aucun nom « Mestier ». Note : le sujet de l'issue est choisi par le formateur le jour J ; aucune autre page n'est ajoutée pour la démo.
- [ ] **Step 8: `TpBrief`** : `Exercise n={2}` « API d'emprunts de matériel » : stack imposée (Go, PostgreSQL, IAM, Docker) et périmètre MVP en 7 endpoints sous forme de liste de pastilles.
- [ ] **Step 9: `TpArchitecture`** : schéma hexagonal : `domain` au centre, `service`, `ports`, `adapters` (`http`, `postgres`) autour, flèches de dépendance vers l'intérieur.
- [ ] **Step 10: `TpTraps`** : grille des 5 pièges (concurrence, retard et fuseau, autorisation, quota + retard, bornes de dates) × « Ce qu'on observe » en une ligne chacun. Source : README du dépôt Go, §5.
- [ ] **Step 11: `TpSteps`** : frise des phases du TP sur 4h avec repères horaires cumulés (spec 45 min, squelette 45 min, règles métier + tests 1h30, revue critique 1h).
- [ ] **Step 12: notes, Vérif, commit** (`feat(slides): add the methodology and the Go lab sections`)

---

### Task 11: Jour 2, bilan, skills, contrôle et pratique MCP

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (sections `J2 : 1 Bilan` et `J2 : 3 Pratique`)

**Interfaces:**
- Consumes: `Break`, `Box`, `Arrow`, `Exercise`, `Gauge`, `Timeline`.
- Produces: `Day2Break`, `Day2Review`, `SkillsRole`, `SkillsFlow`, `SkillsIgnored`, `HumanControl`, `McpLab`, `McpAdapter`, `Recap2`, `Closing`.

- [ ] **Step 1: `Day2Review`** : `Exercise n={3} title="Bilan du TP"`, étapes : 3 choses que l'IA a bien faites, 3 pièges rencontrés, 1 règle à retenir.
- [ ] **Step 2: `SkillsRole`** : trois cartes de rôles (« Revue de code », « Rédaction de tests », « Spécification »), chaque carte avec un mot d'usage.
- [ ] **Step 3: `SkillsFlow`** : fichier « SKILL.md » → injecté dans « Contexte » → « LLM ». Titre : « Comment un skill fonctionne ».
- [ ] **Step 4: `SkillsIgnored`** : même schéma avec une flèche `dashed` « Peut être ignoré », une pastille « Ce ne sont que des instructions », et une garde « Tests et revue ».
- [ ] **Step 5: `HumanControl`** : cycle « Spec → Livraison → Conformité → Décision » avec « Humain » au centre. Titre : « Le chantier est contrôlé par l'humain ».
- [ ] **Step 6: `McpLab`** : `Exercise n={4} title="Un serveur MCP sur l'API"`, étapes : choisir 2 outils (lecture seule d'abord), écrire le serveur dans `internal/adapters/mcp`, tester avec un client MCP, vérifier qu'un étudiant ne peut pas lire l'emprunt d'un autre.
- [ ] **Step 7: `McpAdapter`** : schéma : « Client MCP » → `adapters/mcp` → `service` → `domain`, avec une flèche « Droits vérifiés ici, pas dans le prompt ».
- [ ] **Step 8: `Recap2`** : retour sur `EmptyContext` : le cadre vide est repris et rempli en direct avec la classe. Page de même cadre, rempli de 3 pastilles issues de la classe.
- [ ] **Step 9: `Closing`** : « Comprendre · Spécifier · Contrôler » avec une phrase de fin.
- [ ] **Step 10: notes, Vérif, commit** (`feat(slides): add the day 2 sections`)

---

### Task 12: Assemblage, notes, README et vérification finale

**Files:**
- Modify: `apps/slides/slides/outils-ia/index.tsx` (section `Deck`)
- Modify: `courses/outils-ia/README.md`

**Interfaces:**
- Consumes: toutes les pages produites par les Tasks 2 à 11.
- Produces: `deck` complet, ordonné comme le planning du spec.

- [ ] **Step 1: Ordonner `deck`** : Ouverture → 1 Bases → 2 Coupure → 3 Modèles → 4 Contexte → 5 Dérives → 6 MCP → 7 Marché → Env → Méthodo + démo → TP → J2 bilan → J2 pratique → Closing.
- [ ] **Step 2: Compter** : `grep -c "page:" apps/slides/slides/outils-ia/index.tsx` ; reporter le nombre dans le README.
- [ ] **Step 3: Contrôle de densité** : parcourir le deck et repérer toute page de plus de 40 mots hors schéma ; la scinder ou la raccourcir.
- [ ] **Step 4: Contrôle des chiffres** : `grep -nE "[0-9]+ ?(€|\\$|%|ms|tokens)" apps/slides/slides/outils-ia/index.tsx` ; attendu : aucune valeur inventée (les durées du planning sont autorisées).
- [ ] **Step 5: Mettre à jour `courses/outils-ia/README.md`** : remplacer « un seul deck de 85 slides : bloc 1 slides 1 à 47… » par le nombre de slides réel et le découpage jour 1 / jour 2. Les lignes sur `starter-quiz/` et `bug-hunt/` (Python) ne correspondent plus au fil rouge Go : les laisser en l'état, et signaler au formateur qu'elles sont orphelines.
- [ ] **Step 6: Vérif complète**, puis parcourir tout le deck en mode présentation (touche `F`) et contrôler le tiroir de notes sur 5 pages tirées au hasard.
- [ ] **Step 7: Commit**

```bash
git add apps/slides/slides/outils-ia/index.tsx courses/outils-ia/README.md
git commit -m "feat(slides): assemble the 12h outils-ia deck"
```
