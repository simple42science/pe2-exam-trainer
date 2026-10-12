# 💧 PE II Trainer – Prüfungstrainer Process Engineering II

Eine Lern-Web-App (PWA) für die Wiederholungsprüfung **Process Engineering II** (ETH, Prof. Kai Udert).
Ziel: jede Prüfungsaufgabe wie in den Originalprüfungen 2014–2023 sicher angehen können –
**mit Spick und Taschenrechner in der Prüfung, aber in der App ohne Taschenrechner üben** (z. B. unterwegs).

Keine Anmeldung, kein Server, keine Datenbank. Der Lernfortschritt bleibt **lokal auf dem Handy**
(Browser-Speicher). Funktioniert nach dem ersten Laden auch **offline**.

👉 **App:** https://simple42science.github.io/pe2-exam-trainer/

## Was drin ist

- **18 Kapitel** mit derselben Nummerierung wie Spick, Lernplan und NotebookLM-Quellen (0 Toolbox … 16 Systemintegration, 99 Fallen):
  Kurzfassung, Formeln mit Einheit und Symbol-Erklärung, Rezepte, Fallen, Tipps, durchgerechnete Prüfungsbeispiele.
- **Alle 19 Originalprüfungen (2014–2023)** als Walkthrough: jede Teilaufgabe → *Wie gehst du sie an?* (Ansatz wählen)
  → Lösungsplan Schritt für Schritt → typische Falle → offizielles Resultat → Selbsteinschätzung.
  Die sechs neuesten Prüfungen (2021–2023) sind als **Phase-2-Mock** markiert (Lernplan: zuerst auf Papier lösen).
- **Spiele / Lernmethoden** (948 Items):
  - 🔁 Smart Review (Spaced Repetition über alle Spiele)
  - 🃏 Karteikarten · ❓ Quiz · 🧭 *Which tool?* (Ansatz für echte Prüfungsfragen wählen)
  - ↕️ *Up or down?* (Was steigt, was sinkt – für qualitative Fragen)
  - ✖️ Faktor-Sprint (Kopfrechnen: ×4, ×100 …) · ⚡ Speed-Round mit Highscore
  - 🧩 Formel-Lücken · 🪜 Lösungsweg ordnen · 🐞 Fehler finden · 🔗 Zuordnen
  - ⏱️ Mock-Prüfung (4 zufällige Aufgaben aus 4 verschiedenen Themen)
- **37 interaktive Grafiken** (Graph Lab), z. B. Feststofffluss/State-Point-Analyse, Alkalinitäts-Karte,
  Yao-Modell, Filterlauf (t_B vs. t_HL), Isotherme + PAK-Betriebslinie, MTZ, Konzentrationspolarisation,
  Breakpoint-Chlorung, X-Kriterium, Partikelgrössenverteilung.
- **Prüfungsstrategie**, Spick-Suche, Fortschritt pro Kapitel, Streak, Level & Badges, Countdown zum Prüfungsdatum.

## Auf dem iPhone installieren

1. Die App-URL in **Safari** öffnen.
2. **Teilen** → **„Zum Home-Bildschirm“**.
3. Fertig – startet im Vollbild wie eine native App, auch offline.

## Backup

Unter **Progress → Backup** den Fortschritt als JSON exportieren/importieren
(z. B. vor dem Löschen von Safari-Websitedaten oder beim Handywechsel).

## Lokal ausprobieren

```bash
python -m http.server 8080
# dann http://localhost:8080 öffnen
```

## Inhalte ändern

Alles ist reines HTML/CSS/JavaScript ohne Build-Schritt:

| Datei | Inhalt |
|---|---|
| `data/tNN_*.js` | ein Kapitel: Lernseite (`learn`) und Übungs-Items (`q`) |
| `data/exams_*.js` | die Originalprüfungen als Walkthrough |
| `data/strategy.js` | Prüfungsstrategie |
| `js/graphs.js` | interaktive Grafiken und Schemata |
| `js/games.js`, `js/app.js` | Spiel-Engines, Navigation, Screens |

Formeln stehen in einem kleinen TeX-Dialekt zwischen `$…$` (z. B. `$\frac{C}{C_0} = e^{-k\tau}$`).
Nach Änderungen in `sw.js` die Cache-Version (`CACHE`) erhöhen, damit Handys die neue Version laden.

## Hinweis

Private Lernhilfe, nicht offiziell von der ETH. Die Prüfungsaufgaben sind paraphrasiert; die Resultate stammen aus
den offiziellen Lösungsblättern. Lösungswege und Erklärungen sind eigene Ausarbeitungen (basierend auf Spick,
Lernplan und den NotebookLM-Quellen) – bei Abweichungen gilt das offizielle Material.

---

*Erstellt mit [Claude Code](https://claude.com/claude-code).*
