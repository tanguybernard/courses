PHIND Prompt: _Invent a kata to introduce java oriented object_

Here's a Java-oriented object introduction kata that I've invented:

### The Coffee Shop Kata

Imagine you're working as a software developer for a coffee shop management system. Your task is to create a simple program that simulates the operations of a coffee shop using Java's object-oriented programming concepts.

### Requirements

1. Create classes for:
   - `CoffeeShop`: Represents the entire coffee shop
   - `Barista`: Represents an employee who prepares drinks
   - `Customer`: Represents a customer ordering drinks
   - `Drink`: Represents different types of coffee drinks

2. Implement the following functionality:
   - Customers can enter and exit the shop
   - Baristas prepare drinks when customers order them
   - Drinks have properties like name, price, and ingredients
   - The coffee shop keeps track of its inventory (coffee beans)

3. Include methods for:
   - Adding baristas to the shop
   - Placing orders by customers
   - Serving drinks
   - Updating inventory after serving a drink

### Key Points to Consider

- Use encapsulation to hide internal details of objects
- Implement inheritance for related classes (e.g., different types of drinks)
- Use polymorphism to handle different drink types uniformly
- Consider using composition for relationships between objects (e.g., a Drink has Ingredients)

### Code Implementation

Here's a basic implementation to get you started:

```java
// Drink.java
public abstract class Drink {
    protected String name;
    protected double price;

    public Drink(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public abstract void prepare();
}

// Coffee.java
public class Coffee extends Drink {
    public Coffee(String name, double price) {
        super(name, price);
    }

    @Override
    public void prepare() {
        System.out.println("Preparing " + name);
        // Simulate preparation logic
    }
}

// Tea.java
public class Tea extends Drink {
    public Tea(String name, double price) {
        super(name, price);
    }

    @Override
    public void prepare() {
        System.out.println("Preparing " + name);
        // Simulate preparation logic
    }
}

// Customer.java
public class Customer {
    private String name;

    public Customer(String name) {
        this.name = name;
    }

    public void order(Drink drink) {
        System.out.println(name + " ordered " + drink.getClass().getSimpleName());
        drink.prepare();
    }
}

// Barista.java
public class Barista {
    private CoffeeShop coffeeShop;

    public Barista(CoffeeShop coffeeShop) {
        this.coffeeShop = coffeeShop;
    }

    public void prepareDrink(Customer customer, Drink drink) {
        System.out.println("Barista preparing " + drink.getClass().getSimpleName() + " for " + customer.getName());
        drink.prepare();
        coffeeShop.updateInventory(drink);
    }
}

// CoffeeShop.java
public class CoffeeShop {
    private List<Barista> baristas;
    private Map<String, Integer> inventory;

    public CoffeeShop() {
        this.baristas = new ArrayList<>();
        this.inventory = new HashMap<>();
        inventory.put("coffee beans", 100); // Initial stock
    }

    public void addBarista(Barista barista) {
        baristas.add(barista);
    }

    public void updateInventory(Drink drink) {
        // Simulate updating inventory based on drink type
        // This is a simplified example and would need more complex logic for real-world use
        if (drink instanceof Coffee) {
            inventory.put("coffee beans", inventory.get("coffee beans") - 1);
        } else if (drink instanceof Tea) {
            inventory.put("tea leaves", inventory.get("tea leaves") - 1);
        }
    }

    public boolean hasEnoughIngredients(Drink drink) {
        // Check if we have enough ingredients for the drink
        // This is a simplified example and would need more complex logic for real-world use
        return true; // Always returns true for simplicity
    }
}
```

### Summary and Best Practices

This implementation demonstrates several key OOP concepts:

1. Encapsulation: Classes like `Drink`, `Customer`, and `CoffeeShop` encapsulate their data and behavior.

2. Inheritance: The `Coffee` and `Tea` classes inherit from `Drink`, allowing for common behavior.

3. Polymorphism: The `prepare()` method can be called on different drink types without knowing the specific subclass.

4. Composition: The `CoffeeShop` uses a list of `Barista` objects and a map for inventory management.

5. Abstraction: The `CoffeeShop` class abstracts away the complexities of managing a coffee shop.

Best practices followed:
- Use of appropriate access modifiers (public, private)
- Proper use of inheritance and polymorphism
- Encapsulation of data and behavior within classes
- Use of interfaces (List, Map) where applicable
- Separation of concerns (different classes for different responsibilities)

To further improve this kata, you could add more drink types, implement a GUI, or add more complex logic for inventory management and order processing.

Citations:
[1] https://github.com/pawelpluta/oop-kata
[2] https://www.youtube.com/watch?v=dsJcEgf46Jw
[3] https://www.reddit.com/r/AskProgramming/comments/ojgtxw/unable_to_grasp_objectoriented_programming_as_a/
[4] https://www.youtube.com/watch?v=yApiKoVELSI
[5] https://www.reddit.com/r/java/comments/wxunj9/are_you_guys_actually_making_object_oriented_web/
[6] https://stackoverflow.com/questions/22038782/how-to-approach-java-oop-program
[7] https://www.quora.com/What-are-some-suggestions-for-a-class-project-in-Object-Oriented-Programming-Java
[8] https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/
[9] https://stackoverflow.com/questions/17824108/object-oriented-design-how-to-set-up-class-structure
[10] https://coderanch.com/t/579616/java/introduce-objects-tutorial
