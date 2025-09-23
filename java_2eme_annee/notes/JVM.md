```mermaid
graph TD
    A[Code Source Java .java] --> B[Compilateur Javac]
    B --> C[Bytecode Java .class]
    C --> JVM1[Linux JVM]
    C --> JVM2[Windows JVM]
    C --> JVM3[Mac JVM]
```
Inside 

```mermaid
flowchart TD
    A[Code Source Java .java] --> B[Compilateur Javac]
    B --> C[Bytecode Java .class]
    C --> D[JVM]
    D -->|1| E1[Class Loader]
    D -->|2| E2[Bytecode Verifier]
    D -->|3| E3[Run-time data areas]
    D -->|4| E4[Execution Engine]
    E1 --> F1[Charge les classes au runtime dans la RAM]
    E2 --> F2[Vérification des règles de sécurité - ex: zones mémoire interdites]
    E3 --> F3[Alloue la mémoire nécessaire]
    E4 --> F4[Interprète et compile le bytecode en langage machine]
    F4 --> G[Langage Machine]
    G --> H[Execution du programme]
```


Source:

https://www.scientecheasy.com/2021/03/what-is-jvm.html/
