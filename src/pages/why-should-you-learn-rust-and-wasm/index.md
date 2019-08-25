---
title: Why should you learn rust and wasm
date: '2019-08-??'
spoiler: Rust is system programming language created by mozilla, version 1.0 dates from 2015
---

Rust is system programming language created by mozilla, version 1.0 dates from 2015 and since then it popularity continues to increase. Through this little article I hope at least to catch your attention and arouse your curiosity about this new phenomenon.
Let's go there!

```rust
fn main() {
    println!("Hello, World!");
}
```

# 1. Community
Weird to start with this point that may seem useful but not so important when talking about a new technology. And yet the community around rust is amazing and believe me this is an important aspect when learning a new language. Mozilla has really managed to federate a strong hacker community around his language.

One of the most positive and concrete effects it can have is quite exciting; rust is not an easy language, but paradoxically beginners can contribute very easily on rust's open source projets. I have been doing javaScrit for many more time than rust but i have already many more contributions in project write in rust
If you want to start a career in open source rust can be an entry way. 

# 2. How computer works
Rust is a low level language. In order to use it effectively, you will have to grasp some memory working aspect as how the heap and the stack work together. I'm learned a lot about how computer handle strings in memory.   
This knowledge will serve you even outside Rust and will help you to become a better programmer. 


These days we mostly works with highly dynamics language like JavaScript, python that we have almost forgeting that in the end the CPU still execute your code, rust will remind you that.

# 3. Performance and security
If you work the video games's industrie or in the system programming (embedded, real time, OS), the chances are great that you have to use C/C ++. These languages allows direct manipulation of memory, and offers more power and flexibility.

However, this power comes with drawbacks. These languages ​​do not provide the same ergonomics as the higher level languages ​​that have a garbage collector that slows the runtime. And pointer manipulation errors happen frequently. Rust is to this day the only mainstream language that can be used in production, which excludes both high-level garbage collection and manual manipulation of memory. 

We arrive at a kind of perfect trad-off between the power of C and the expressiveness of a high level language.

```rust
fn main() {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let only_even : Vec<&i32> = a.iter().filter(|&x| x % 2 == 0).collect();
    dbg!(&only_even); // print [2, 4, 6, 8, 10]
}
```
[Try it](https://play.integer32.com/?version=stable&mode=debug&edition=2018&gist=4c1f5d7094d7484176829522a493fccb)


This is the promise of language expressiveness very js-like but with zero runtime like in C!
This magic is achieved thanks to the ownership and borrowing which make sure at compile time that there are no errors of manipulations of variables and references.

# 4. Write once, run everywhere

This is the promise of Webassembly. It allows to leave the monopoly whose javascript enjoyed for over 20 years in the browser. There is no direct link between WASM and Rust, they both matured independantly but they share the same parent Mozilla, and they work very well together. WASM allow Rust to run in browser! 


Eventually all languages ​​will compile to WASM, but now in the MVP version from February 2017, only languages ​​without runtime have found a practical reason to do so. Indeed the others have to bring their runtime with them to be able to access their garbage collector. This make their binary heavier and greatly reduces the interest compared to simple JS. This will change as the WASM 's specification will evolve and allow access to GC. 
Rust and C/C ++, however, can already be compiled to WASM with significant gains of performance in some areas.


And that's not all, thanks to [WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/) which is a standart for creating an interface between the system calls and the WASM, we can then use WASM out of the browser, but keeping the sandbox aspect of the navigator, the external lib will not be able to perform actions criticize on the parts of the system they do not have access to. So a source file in rust (or python, go c ...) compiled once by targeting the wasm will be able to execute in all the bones having a WASM runtime. A big step towards multiplatform development is going to be done. Electron has facilitated the development of great applications, but tomorrow WASM / WASI will aim for the same goal but with clearly superior performance.


Another area where WASM is going to shine is cloud computing. Lambda no longer execute native code, but WASM VMs which, compared to dockers, have lower bootime and a much lower memory footprint. WASM is so up-to-date that one of the founders of docker Solomon Hykes has recently made this emphatic statement: 
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If WASM+WASI existed in 2008, we wouldn&#39;t have needed to created Docker. That&#39;s how important it is. Webassembly on the server is the future of computing. A standardized system interface was the missing link. Let&#39;s hope WASI is up to the task! <a href="https://t.co/wnXQg4kwa4">https://t.co/wnXQg4kwa4</a></p>&mdash; Solomon Hykes (@solomonstre) <a href="https://twitter.com/solomonstre/status/1111004913222324225?ref_src=twsrc%5Etfw">March 27, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


# 5. it 's just fun !

Learning rust is just terribly exhilarating. Hard to explain why, feelings of power and security can be. A code in rust that compiles is code where it does not track the segmentation fault.

But beware the learning curve is very steep, the lifetimes the ownership and borrowing are not going to be tamed easily. Fortunately there are many resources to learn the language starting with [rust book](https://doc.rust-lang.org/book/).I strongly recommended you to at least do a good half of the book before embarking on a project. The book covers all the language and includes two tutorials implementing the unix grep command and a web server.