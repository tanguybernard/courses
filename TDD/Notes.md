

### Mock

Les mocks sont programmés avec des attentes (expectations) et permettent de contrôler que le système sous test a bien appelé certains méthodes, souvent en vérifiant les paramètres ou le nombre d’appels.


__Les mocks focalisent sur le comportement et déclenchent l’échec du test si les interactions attendues (méthode appelée, nombre de fois, avec ces paramètres) ne sont pas respectées.__


```java
// Interface UserRepository
public interface UserRepository {
    User findUserById(int id);
}

// Classe UserService
public class UserService {
    private UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public String getUserName(int id) {
        User user = userRepository.findUserById(id);
        return user != null ? user.getName() : "User not found";
    }
}

// Test avec Mockito
import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

public class UserServiceTest {
    @Test
    public void testGetUserName() {
        // Créer un mock de UserRepository
        UserRepository mockRepository = mock(UserRepository.class);
        // Définir le comportement du mock
        User mockUser = new User(1, "John Doe");
        when(mockRepository.findUserById(1)).thenReturn(mockUser);

        // Utiliser le mock pour tester UserService
        UserService userService = new UserService(mockRepository);
        String userName = userService.getUserName(1);

        // Vérification
        assertEquals("John Doe", userName);
        verify(mockRepository).findUserById(1); // Vérification de l'interaction
    }
}
```



### Stub

Les stubs sont utilisés pour simuler des méthodes ou des fonctions afin de contrôler l’état du système sous test, mais ils ne vérifient pas comment ils ont été utilisés.

__Les stubs focalisent sur l’état et permettent de donner des réponses spécifiques à l’application afin de faciliter le test.__

```java
public class PaymentGatewayStub implements PaymentGateway {
    @Override
    public boolean processPayment(Order order) {
        return true; // Réponse fixe pour simuler un paiement réussi
    }
}

public class OrderServiceTest {
    @Test
    public void testPlaceOrder() {
        PaymentGatewayStub stubGateway = new PaymentGatewayStub();
        OrderService orderService = new OrderService(stubGateway);
        Order order = new Order(1, "Laptop", 1, 1200.00);

        // Le stub donne toujours le même résultat
        boolean result = orderService.placeOrder(order);
        assertTrue(result);
    }
}
```

### Fake

Un “fake” est un double de test qui fournit une implémentation fonctionnelle simplifiée. C'est un Stub avec de la logique.


```java

public interface UserRepository {
    User findById(int id);
    void save(User user);
}

import java.util.HashMap;
import java.util.Map;

public class InMemoryUserRepository implements UserRepository {
    private Map<Integer, User> storage = new HashMap<>();

    @Override
    public User findById(int id) {
        return storage.get(id);
    }

    @Override
    public void save(User user) {
        storage.put(user.getId(), user);
    }
}
```
