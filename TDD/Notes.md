## Doubles de test

Un double de test remplace une vraie dépendance pendant un test.

Fil rouge : le kata Birthday Greetings. Chaque matin, on envoie un message aux employés dont c'est l'anniversaire.

### Les cinq doubles

| Double | En une phrase | Ce qu'on vérifie | Dans le fil rouge |
| -------- | ------------------------------ | ------------------------------ | ------------------------------ |
| Dummy | il est là, mais personne ne l'appelle | rien sur lui | `MessageService` quand personne n'a son anniversaire |
| Stub | il donne une réponse préparée | le résultat du code testé | `findAll` qui retourne Alice et Bob |
| Fake | il fonctionne vraiment, en version simplifiée | le résultat ou les appels à un autre double | `InMemoryEmployeeRepository` |
| Mock | il fait semblant et enregistre les appels | les appels reçus | `verify(messages).send(...)` |
| Spy | il exécute le vrai code et enregistre les appels | les appels reçus | `spy(new ConsoleMessageService())` |

### Stub vs Mock

__Le stub répond, le mock vérifie.__

| | Stub | Mock |
| -------- | ------------------------------ | ------------------------------ |
| Sens | dépendance → code testé | code testé → dépendance |
| Type d'appel | une question : « qui sont les employés ? » | un ordre : « envoie ce message » |
| Place dans le test | Arrange : prépare le scénario | Assert : c'est ce qu'on vérifie |
| Mockito | `when(...).thenReturn(...)` | `verify(...)` |

### Quel double choisir ?

1. Le code testé n'appellera jamais la dépendance → __Dummy__
2. Le test a besoin d'une réponse de la dépendance :
   - une réponse fixe suffit → __Stub__
   - les réponses dépendent des appels précédents (`save` puis `findAll`) → __Fake__
3. Le test doit vérifier ce qu'on demande à la dépendance :
   - sans exécuter la vraie logique → __Mock__
   - en exécutant la vraie logique → __Spy__

### Le code testé

Ce code est adapté du kata : `save` sert à illustrer le fake, et le retour `int` sert à la démonstration. Les imports sont omis.

```java
public record Employee(String firstName, String email, LocalDate birthDate) {
    boolean isBirthday(LocalDate today) {
        return birthDate.getMonth() == today.getMonth()
            && birthDate.getDayOfMonth() == today.getDayOfMonth();
    }
}

public interface EmployeeRepository {
    List<Employee> findAll();
    void save(Employee employee);
}

public interface MessageService {
    void send(String to, String subject, String body);
}

public class BirthdayService {
    private final EmployeeRepository employees;
    private final MessageService messages;

    public BirthdayService(EmployeeRepository employees, MessageService messages) {
        this.employees = employees;
        this.messages = messages;
    }

    public int sendGreetings(LocalDate today) {
        int sent = 0;
        for (Employee e : employees.findAll()) {
            if (e.isBirthday(today)) {
                messages.send(e.email(), "Joyeux Anniversaire !", "Bon anniversaire " + e.firstName() + " 🎉");
                sent++;
            }
        }
        return sent;
    }
}
```

Les tests utilisent ces données : Alice a son anniversaire aujourd'hui, pas Bob.

```java
LocalDate today = LocalDate.of(2026, 11, 2);
Employee alice = new Employee("Alice", "alice@example.com", LocalDate.of(1990, 11, 2));
Employee bob = new Employee("Bob", "bob@example.com", LocalDate.of(1985, 3, 14));
```

### Stub et Dummy

Le stub fournit Bob. Comme Bob n'a pas son anniversaire, `send` n'est jamais appelé : le `MessageService` est un dummy, présent uniquement parce que le constructeur l'exige.

```java
@Test
void renvoie_zero_si_personne_n_a_son_anniversaire() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenReturn(List.of(bob));   // STUB
    MessageService dummy = mock(MessageService.class);    // DUMMY

    BirthdayService service = new BirthdayService(employees, dummy);

    assertEquals(0, service.sendGreetings(today));
}
```

### Mock

L'envoi du message ne se voit pas dans le résultat : on vérifie donc l'appel.

```java
@Test
void envoie_le_message_a_alice() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenReturn(List.of(alice, bob)); // STUB
    MessageService messages = mock(MessageService.class);

    new BirthdayService(employees, messages).sendGreetings(today);

    verify(messages).send("alice@example.com", "Joyeux Anniversaire !", "Bon anniversaire Alice 🎉"); // MOCK
}
```

### Fake

Une liste en mémoire remplace la base de données : ce qui est enregistré avec `save` est retrouvé par `findAll`.

```java
public class InMemoryEmployeeRepository implements EmployeeRepository {
    private final List<Employee> storage = new ArrayList<>();

    @Override
    public List<Employee> findAll() {
        return storage;
    }

    @Override
    public void save(Employee employee) {
        storage.add(employee);
    }
}
```

```java
@Test
void envoie_le_message_a_un_employe_enregistre() {
    EmployeeRepository employees = new InMemoryEmployeeRepository(); // FAKE
    employees.save(alice);
    MessageService messages = mock(MessageService.class);

    new BirthdayService(employees, messages).sendGreetings(today);

    verify(messages).send("alice@example.com", "Joyeux Anniversaire !", "Bon anniversaire Alice 🎉"); // MOCK
}
```

### Spy

Le vrai `send` s'exécute, et on peut quand même vérifier l'appel.

```java
public class ConsoleMessageService implements MessageService {
    @Override
    public void send(String to, String subject, String body) {
        System.out.println(to + " : " + subject + " - " + body);
    }
}
```

```java
@Test
void envoie_le_message_avec_un_spy() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenReturn(List.of(alice));       // STUB
    MessageService messages = spy(new ConsoleMessageService()); // SPY

    new BirthdayService(employees, messages).sendGreetings(today);

    verify(messages).send("alice@example.com", "Joyeux Anniversaire !", "Bon anniversaire Alice 🎉");
}
```

### La démonstration à faire en cours

Ajouter ce test, qui ne vérifie que le résultat :

```java
@Test
void compte_les_employes_dont_c_est_l_anniversaire() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenReturn(List.of(alice, bob)); // STUB

    BirthdayService service = new BirthdayService(employees, mock(MessageService.class));

    assertEquals(1, service.sendGreetings(today));
}
```

Supprimer ensuite la ligne `messages.send(...)` de `BirthdayService`, garder `sent++`, puis relancer les tests.

| Test | Résultat | Pourquoi |
| -------- | -------- | ------------------------------ |
| `compte_les_employes_dont_c_est_l_anniversaire` | ✅ vert | le compteur vaut toujours 1 |
| `envoie_le_message_a_alice` | ❌ rouge | le message n'est plus envoyé |

Plus aucun message ne part, et pourtant le résultat de la méthode est correct : seul un `verify` détecte le bug. Les tests du fake et du spy passent donc aussi au rouge, car ils utilisent `verify`.

---

### Annexe : les nuances

#### Comparer les doubles

- __Dummy vs Stub :__ le code testé n'appelle jamais le dummy, alors qu'il utilise la réponse du stub.
- __Fake vs Mock :__ le fake sert à faire fonctionner le code testé. Le mock sert à vérifier les appels reçus.
- __Spy vs Mock :__ les deux permettent `verify`, mais le mock fait semblant, alors que le spy exécute le vrai code.
- __Fake vs Stub :__ le stub répète une réponse écrite dans le test, alors que le fake a un vrai comportement. La différence se voit avec `save` :

```java
// Stub : la réponse est figée, save ne change rien
EmployeeRepository stub = mock(EmployeeRepository.class);
when(stub.findAll()).thenReturn(List.of(alice));
stub.save(bob);
stub.findAll(); // [alice]

// Fake : ce qui est enregistré est retrouvé
EmployeeRepository fake = new InMemoryEmployeeRepository();
fake.save(alice);
fake.save(bob);
fake.findAll(); // [alice, bob]
```

#### Les pièges à signaler

- __`mock()` ne crée pas forcément un mock.__ Malgré son nom, cette méthode de Mockito crée juste un double. C'est l'usage qui décide de son rôle : jamais appelé, c'est un dummy ; avec `when`, un stub ; avec `verify`, un mock.
- __Un double appelé mais jamais vérifié n'est pas un dummy.__ Dans `compte_les_employes_dont_c_est_l_anniversaire`, `send` est bien appelé. Ce double se rapproche d'un stub qui n'a rien à répondre : il laisse passer l'appel, et le test ne s'y intéresse pas.
- __Ne pas vérifier un stub.__ `verify(employees).findAll()` n'apporte rien : si le code ne lisait pas les employés, un test qui attend un message échouerait déjà. En plus, ce `verify` casserait au moindre refactoring qui lit les employés autrement.
- __Ne pas tout vérifier avec des mocks.__ Si le résultat de la méthode suffit à prouver le comportement, on vérifie le résultat.

#### Exemples de choix

| Ce que je veux tester | `EmployeeRepository` | `MessageService` | Pourquoi |
| ------------------------------ | -------- | -------- | ------------------------------ |
| Le compteur vaut 0 si personne n'a son anniversaire | Stub | Dummy | `send` n'est jamais appelé |
| Alice reçoit le bon message | Stub | Mock | l'envoi ne se voit que dans les appels |
| Aucun message ne part si personne n'a son anniversaire | Stub | Mock | on vérifie l'absence d'appel |
| L'erreur remonte si la base est indisponible | Stub | Mock | le stub provoque facilement l'erreur |
| Un employé enregistré reçoit son message | Fake | Mock | `save` doit réellement avoir un effet sur `findAll` |

```java
@Test
void n_envoie_rien_si_personne_n_a_son_anniversaire() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenReturn(List.of(bob));  // STUB
    MessageService messages = mock(MessageService.class);

    new BirthdayService(employees, messages).sendGreetings(today);

    verify(messages, never()).send(any(), any(), any()); // MOCK
}

@Test
void remonte_l_erreur_si_la_base_est_indisponible() {
    EmployeeRepository employees = mock(EmployeeRepository.class);
    when(employees.findAll()).thenThrow(new IllegalStateException("base indisponible")); // STUB
    MessageService messages = mock(MessageService.class);

    BirthdayService service = new BirthdayService(employees, messages);

    assertThrows(IllegalStateException.class, () -> service.sendGreetings(today));
    verify(messages, never()).send(any(), any(), any());                                 // MOCK
}
```

#### Les mauvais choix à éviter

| Mauvais choix | Problème | Meilleur choix |
| ------------------------------ | ------------------------------ | -------- |
| Un spy sur un vrai service d'envoi de mails | le test envoie de vrais mails | Mock |
| Un stub pour tester `save` puis `findAll` | `findAll` ignore ce qui a été enregistré | Fake |
| Un `verify` sur `findAll` sans exigence particulière | le test casse au moindre refactoring | Stub |
| Un fake complet pour une seule réponse fixe | trop de code pour le besoin | Stub |

#### De Mockito à Jest

Les katas sont en TypeScript avec Jest. Les notions sont les mêmes, seule la syntaxe change.

| Rôle | Mockito | Jest |
| ------------------------------ | ------------------------------ | ------------------------------ |
| Créer un double | `mock(MessageService.class)` | `jest.fn()` |
| Préparer une réponse (stub) | `when(...).thenReturn(42)` | `jest.fn().mockReturnValue(42)` |
| Vérifier un appel (mock) | `verify(messages).send(...)` | `expect(send).toHaveBeenCalledWith(...)` |
| Vérifier l'absence d'appel | `verify(messages, never()).send(...)` | `expect(send).not.toHaveBeenCalled()` |
| Observer le vrai code (spy) | `spy(objet)` | `jest.spyOn(objet, "methode")` |

#### Une autre définition du mock

Au sens strict (Meszaros, repris par Martin Fowler), un mock reçoit ses attentes avant l'appel, alors que `verify` les contrôle après, ce qui le rapproche d'un spy. Cette note retient le vocabulaire courant et celui de Mockito.


## Test paramétrés


https://www.sfeir.dev/back/un-test-pour-les-gouverner-tous/


## Transformation Priority Premises (TPP)

Liste (simplifiée) des TPP selon Uncle Bob :


| Priorité | Transformation                 | Description                                                 |
| -------- | ------------------------------ | ----------------------------------------------------------- |
| 1️⃣      | **{} → nil**                   | D’un code vide à un retour vide (ou `None`, `null`, etc.)   |
| 2️⃣      | **nil → constant**             | Retourner une constante fixe                                |
| 3️⃣      | **constant → variable**        | Utiliser une variable au lieu d’une constante               |
| 4️⃣      | **statement → statements**     | Ajouter une séquence d’instructions                         |
| 5️⃣      | **unconditional → if**         | Ajouter une condition (`if`)                                |
| 6️⃣      | **scalar → array**             | Passer d’une valeur simple à une collection                 |
| 7️⃣      | **statement → tail recursion** | Transformer une instruction en appel récursif               |
| 8️⃣      | **if → while**                 | Répéter une action                                          |
| 9️⃣      | **expression → function**      | Extraire du code dans une fonction                          |
| 🔟       | **variable → assignment**      | Remplacer une variable calculée par une affectation directe |
| 1️⃣1️⃣   | **statement → recursion**      | Généraliser une séquence en récursion                       |
| 1️⃣2️⃣   | **if → polymorphism**          | Remplacer une structure conditionnelle par du polymorphisme |

