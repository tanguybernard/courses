Main


```java
package fr.edf.tipienergy.orderservice.rover;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class RoverTest {


    @Test
    void test(){
        Rover rover = new Rover(new Position(1,1), "E");
        MarsMap map = new MarsMap();


        Mission mission = new Mission(rover, map);
        mission.sendInstruction("F");

        assertThat(rover.getPosition().i).isEqualTo(2);
        assertThat(rover.getPosition().j).isEqualTo(1);



    }
}

```


Rover 


```java
package fr.edf.tipienergy.orderservice.rover;

import java.util.Objects;

public class Rover {
    private final String direction;
    private Position position;

    public Rover(Position position, String direction) {
        this.position = position;

        this.direction = direction;
    }

    public Position getPosition() {
        return this.position;
    }

    public void avance() {
        if(Objects.equals(direction, "E")) {
            this.position = new Position(this.position.i +1, this.position.j);
        }

    }
}
```

Position

```java
package fr.edf.tipienergy.orderservice.rover;

public class Position {
    public final int i;
    public final int j;

    public Position(int i, int j) {
        this.i = i;
        this.j = j;
    }
}

```

Mission

```java
package fr.edf.tipienergy.orderservice.rover;

import java.util.Objects;

public class Mission {

    private final Rover rover;
    private final MarsMap map;

    public Mission(Rover rover, MarsMap map) {

        this.rover = rover;
        this.map = map;
    }

    public void sendInstruction(String ins) {
        if(Objects.equals(ins, "F")) {
            rover.avance();
        }

    }
}
```

MarMap

```java
package fr.edf.tipienergy.orderservice.rover;

public class MarsMap {
}
```
