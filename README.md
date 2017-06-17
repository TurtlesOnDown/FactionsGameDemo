# FactionsGameDemo
 
A demo-game using the Ensemble Engine and Phaser to demonstrate the use of a rule based system to generate quests.
 
I build this project for two reasons, the first was to be able to demonstrate it in working product and to help teach myself Phaser. Since I was an assistant for a game programming class, this project helped me learn the system so that I could in turn help the students.
 
## Goals of the project:
 
1. Learn Phaser
2. Make a game where players helped one of three factions through quests
3. Once a quest completed, the world state changed
4. New quests would be handed out based on the new world state
 
## How it works:
 
  Ensemble contains a list of rules for each faction about their state, what they want to do, and the actions they can do. It then generates a list of possible actions in order of most desirable to least desirable. The game then takes that list and generates possible quests for the player from that list of actions. When a quest is completed, the action is marked as done and Ensemble moves forward a time step. Ensemble then determines what each faction wants to do depending on the changes in state and produces another list of actions for the new quests.
 
## How Rule based AI works(Ensemble):
 
  Rule based AI works by having a list of predicates about the state, and a list of rules change the state dependant on those predicates.
* Example predicates: A and B are friends, A and C are enemies.
* Example rule: If X and Y are friends, and X and Z are enemies, then Y and Z become enemies.
 
At each new timestep, the predicates are checked against the rules and then used to alter the state or determine a desire to perform an action. Such as "If X and Y are friends, then X and Y are +10 more likely to TRADE" where TRADE is a keyword for either a specific action or a list of possible actions.
 
  Ensemble specifically breaks the rules into two types, volitions and trigger rules. Trigger rules are a forced change to the state of the world, such as the first example described above. Volition rules, however, behave like the second example and are used for determining the actions that the npc's wish to perform.
  
### Benefits:
 
* Once set up the system is easy to maintain and easy to add new factions or create different personalities of AI
* The system responds well to changes and alters all actors accordingly
* The system can be setup to remember previous time steps and therefore generate a "history" which can be used to generate dynamic quest text
* Reasons for why an actor wants to do a certain thing can be presently clearly to the player
* Does not need to be run every frame, only every time the world has changed significantly
 
### Drawbacks:
 
* The system has a large up front work requirement to set up and structure effectively
* If an action has an emotional impact on the actors of the game it MUST be registered with the system which could cause heavy requirements for the AI thread
* Lack of tools to support managing and controlling the system if it gets too large(This can be solved someday though!)
 
 
Overall, I believe this system has a large potential for games that rely on multiple factions and persistent changes to an environment. Such uses could include 4X games, MMO games, and sandbox games.

  
