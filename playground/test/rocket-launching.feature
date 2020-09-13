Feature: Rocket Launching

  Scenario Outline: Launching a SpaceX rocket
    Given I am <Astronaut> attempting to launch a rocket into space
    When I launch the rocket
    Then the rocket should end up in space
    And the astronaut is <Astronaut>
    And the booster(s) should land back on the launch pad
    But nobody should doubt me ever again

    Examples:

      | Astronaut                                       |
      | Matt Dunn                                       |
      | Clem Fandango                                       |
      | Pat Mustard                                       |
