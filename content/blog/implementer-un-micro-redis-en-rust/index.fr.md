---
title: Implementer un micro-redis en rust
date: '2022-09-22'
spoiler: Nous implementer redis la base de donnée clé valeur en rust
---

Rust est language qui gagne de plus en plus de popularité ces derniers temps, la grosse news de ces derniers jours est qu'on pourra bientôt écrire des drivers linux rust. Rust entre définittivement dans la cour des grands. C'est donc le bon moment pour investir du temps dans ce language

Quant à moi j'ai eu le nez creux puisque j'ai écris mes premieres ligne en rust fin 2017 ! Cependant je me considère toujours comme un débutant tant j'ai été inconsistant depuis lors  malgré quelques petits projets et contributions open-source. 

D'où l'intérêt pour moi de commencer un nouveau projet en rust et d'expliquer ici mon procesus de reflexion pour résoudre les problèmes que j'ai recontré pour définitivement tenter de passer au stade supérieur 


# 1. Objectif
Pour rappel redis est une base de données clé-valeur, servant souvent de cache dans les projets web. 
Concrètement on aura un serveur tcp qui pourra recevoir des requêtes de plusieurs clients en parallèles, parser les requêtes, lire et écrires dans une une hashmap. 

# 2. Server tcp
J'avoue que là je me suis pas géné et j'ai copier/coller allègrement le code qui fait la même chose dans de rust book, livre que je recommande vivement d'ailleurs. 
```rust
use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:6379").unwrap();
    match listener.accept() {
        Ok((_socket, addr)) => println!("accepted new client: {:?}", addr),
        Err(e) => println!("couldn't accept client: {:?}", e),
    }
}
```
J'ai juste remplacé l'adresse et le port par ce qui sont dans redis les valeurs par défault.



# 3. Répondre à un ping
Si vous travaillez dans l'industie du jeux vidéo ou dans la programmation système(emarquée, temps réels, os), les chances sont grandes que vous soyer obligé d'utiliser l'increvable couple C/C++. Ce language permet de manipuler directement la mémoire, et offre plus de puissance et de fléxibilité. 

Cependant ce pouvoir vient avec des incovénients. Ces languages ne procurent pas la même ergonomie que les languages plus hauts niveaux qui eux ont un garbage collecteur qui ralentie le runtime. La manipulation automatique de la mémoire diminue les performances, mais évité toute une catégorie de problèmes. Rust est à ce jour le seul language mainstream utilisable en production , qui exclue à la fois le garbage collecteur de haut niveau et la manipulation manuelle de la mémoire. 

On arrive à une sorte de conpromis parfait entre la puissance du C et l'expressivité d'un language haut niveau.

```rust
fn main() {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let only_even : Vec<&i32> = a.iter().filter(|&x| x % 2 == 0).collect();
    dbg!(&only_even); // print [2, 4, 6, 8, 10]
}
```
[Essayer ici](https://play.integer32.com/?version=stable&mode=debug&edition=2018&gist=4c1f5d7094d7484176829522a493fccb)


Voilà la promesse du language une expressivité très js-like mais avec zéro runtime comme en C !
Cette magie est atteinte grâce au ownership et borrowing qui s'assurent à la compilation qu'il n'y pas d'erreurs de manipulations de variables et de références.

# 4. Ecriver une fois, deployer partout
C'est la prommesse du webassembly. Il permet de sortir du monopole dont javascript jouis depuis plus  20 ans dans le browser.


A terme tous les languages pourront compiler vers WASM, mais saujourd'hui dans sa version MVP datant de fevrier 2017, seul les languages sans runtime ont trouvé une utilité pratique. En effet les autres sont obligés d'embarqué avec eux leur runtime pour pouvoir accéder à leur garbage collector. Ce qui allourdit fortement le binaire et diminue fortement l'interêt par rapport à du simple JS.
Rust et C/C++ parcontre peuvent d'ores et déjâ compilé vers WASM avec des gains de perfs notables dans certains domaines. 


Et ce n'est pas tout, grâce à [WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/) qui est un standart permettant de créer une interface entre les appels système et la VM WASM, on pourra alors utiliser WASM hors du navigateur, mais en gardant l'aspect sandbox du navigator, les lib externes ne pourront pas effectruer des actions critiquent sur les parties du système dont elles n'ont pas accès. Donc un fichier source en rust (ou python, go c...)  compilé une fois en ciblant le wasm pourra s'éxécuter dans tous les os ayant un runtime WASM. Un grand pas en plus vers les développement multiplatform vas être fait. Electron nous a faciliter le developpement de superbes applications, mais demain WASM/WASI visera le même but mais avec des performances clairement supérieur.


Un autre domaine où le WASM est en train s'imisser est le cloud computing. Les lambda n'éxecutent plus du code natifs mais des VM WASM qui par rapport à docker ont un bootime inférieur et une beacoup plus faible empreinte mémoire. WASM bouleverse tellement la donne que l'un des fondateurs de docker Solomon Hykes a recemment fait cette déclation emphatique:  
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If WASM+WASI existed in 2008, we wouldn&#39;t have needed to created Docker. That&#39;s how important it is. Webassembly on the server is the future of computing. A standardized system interface was the missing link. Let&#39;s hope WASI is up to the task! <a href="https://t.co/wnXQg4kwa4">https://t.co/wnXQg4kwa4</a></p>&mdash; Solomon Hykes (@solomonstre) <a href="https://twitter.com/solomonstre/status/1111004913222324225?ref_src=twsrc%5Etfw">March 27, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


# 5. C'est juste fun!

Apprendre rust c'est juste terriblement grisant§. Difficile d'expliquer pourquoi, le sentiments de puissance et de sécurité peut être. Un code en rust qui compile est code où traqurait pas les segmentation fault.

Mais attention la courbe d'apprentissage est très raide, les lifetimes le ownership et le borrowing ne vont pas se laisser dompter facilement. Heureusement ils existent de nombreuses ressources pour apprendre le language en commençant par [rust book](https://doc.rust-lang.org/book/). Il est fortement conseillé d'au moins faire une bonne moitié du bouquin avant de se lancer dans un projet. Le bouquin couvre  tout le language et comprend deux tutoriel implémentant la commande unix grep et un serveur web.
