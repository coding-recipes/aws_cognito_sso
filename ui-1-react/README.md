## Lottó-szimulátor demo project

**Distributions:**  
PROD: [lotto.p66.hu](https://lotto.p66.hu)  
DEV:  [dev.lotto.p66.hu](https://dev.lotto.p66.hu)

**CI/CD:**  
Gihub Actions:  
https://github.com/maczopeter/demo-abesse-v1-ui/actions

**UI Repository:**  
https://github.com/maczopeter/demo-abesse-v1-ui

**CDN solution: AWS S3 + CloudFront**  
Stack deployed via AWS CDK  
repository:  
https://github.com/maczopeter/demo-abesse-v1-ui-dist


## Projekt feladat leírás
Egy ügyfelünk kutatáshoz szeretne egy lottó szimulátor webalkalmazást kérni, amelynek a célja, hogy bemutassa, mennyi idő alatt hányszor - hány találatot sikerül elérni. 

**Az alkalmazás specifikációja**  
Az Ötös Lottó mintájára, fixen 5 számot kell tudjon folyamatosan sorsolni 1-től 90-ig.

Ahogy a lottóban sem, itt sem szerepelhet egy szám többször egy húzásban. A felhasználó a felületen láthatja, hogy melyek az éppen kihúzott számok. Lehetősége kell legyen saját számokat megadni, vagy random számokkal játszani. A saját számokat beégetheted a kódba, vagy létrehozhatsz ténylegesen kitölthető input fieldeket is. 
Szeretnék, ha egy csúszkával szabályozható lenne a sorsolások sebessége. A csúszka sebessége 1 másodperc és 1 milliszekundum között legyen variálható. Továbbá lehetőséget szeretnénk biztosítani a felhasználó számára, hogy láthassa mennyi ideje lottózik (években szeretnék mutatni, egy héten egyszer van sorsolás). 

A felületen jelezni kell, hogy mennyi szelvényt adott fel eddig, illetve mennyi 2, 3, 4 és 5 találatos szelvénye volt; továbbá, hogy mennyi pénzt költött el eddig szelvényekre. (Egy szelvény ára az alkalmazásban 300 forint)

Abban az esetben, ha 5 találatos szelvénye volt a felhasználónak, a sorsolás álljon meg, és az eltelt évek száma legyen kiemelt (a korábbi állapotától megjelenésben térjen el).

**Technikai specifikáció:**  
-	Bármilyen modern front-end keretrendszer alkalmazható az alkalmazás megvalósítására, arra kérünk, hogy React-ben készítsd el.
-	A stílusozáshoz elsősorban SASS pre-processor javasolt, de lehet bármilyen más - modern - stílusfeldolgozó rendszer.
-	Az alkalmazás forrása verziókezelőben legyen tárolva
-	Plusz pont, ha a számok generálását egy a `Math.Random` metódustól megbízhatóbb algoritmus végezné. (Crypto API pl)
-	Plusz pont, ha valamilyen CI/CD szolgáltatás segítségével deployolva van valahova.
-	Legyen reszponzív, mobilon is működjön az alkalmazás
-	Fontos, hogy Private Github repository-ban dolgozz, ha elkészültél, akkor pedig shareld a repository-t, a leírás alján található fiókokkal

**Dizájn:**  
Mivel ez csak egy kísérleti alkalmazás az ügyfél nem kért külön dizájnt az alkalmazáshoz, de a kollégák összeraktak egy look & feel-t, hogy milyen irányba lenne érdemes menni vele: https://www.figma.com/file/ys3GzXmcsDFN3HCqUlSkyk/Frontend-pr%C3%B3bafeladat?node-id=1%3A685  
Ettől te nyugodtan eltérhetsz és lehetsz kreatív, ha úgy érzed, de ez nem elvárás. 
