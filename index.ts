#! /usr/bin/env node
import { log } from "console";
import inquirer from "inquirer";
let enemies: string[]= ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;

let health: number = 100;
let attackDamage : number = 50;
let numHealthPotions: number = 3;
let healthPotionHEalAmount: number = 30;
let healthPotionDropChance: number = 50; // percentage

let running: boolean = true;
let getRandomNumber = ( min: number, max: number)=> {
    return Math.floor(Math.random()* max - min) + min;
}

console.log("\tWelcome to the Dungeon");
Game:
while(running){
    console.log("\t*****************************************************");
    let enemyHealth: number = getRandomNumber(1, maxEnemyHealth)
    let enemy: string = enemies[getRandomNumber(0, enemies.length-1)];
    console.log(`\t#${enemy} has appeared #\n`);
    while ( enemyHealth > 0){
        console.log(`\tYour HP: ${health}`);
        console.log(`\t${enemy} HP: ${enemyHealth}`);
        let control = await inquirer.prompt({
            message: "\tWhat would you like to do?\n",
            type: "list",
            choices: ["\tAttack", "\tDrink Health Potions", "\tQuit"],
            name: "command"

        });
        switch(control.command){
            case "\tAttack": 
            let strikeDamage: number = getRandomNumber(1, attackDamage);
            let damageTaken: number = getRandomNumber(1, enemyAttackDamage);
             health -= damageTaken;
             enemyHealth -= strikeDamage;
             console.log(`\tYou strike the ${enemy} with ${strikeDamage} damage.`);
             console.log(`\tyou received ${damageTaken} damage from the enemy.\n`);
             if(health < 1 ){
                console.log(`\tYou have taken too much damage. you are too much weak to go on.`);
                break;
             }

            break;
            case "\tDrink Health Potions":
                if (numHealthPotions > 0){
                    health += healthPotionHEalAmount;
                    console.log;log(`\tYou drank health potion, healing yourself for ${healthPotionHEalAmount}. 
                    \n\tyou now have ${health} HP\n\t now you have ${numHealthPotions} left\n`);
                } 
                else{
                    console.log(`\tYou have no health potions left, defeat enemies for a chance to get one.\n`)
                }
            break;
            case "\tQuit": 
            console.log(`\tYou ran away from ${enemy}\n`);
            continue Game;
            break;

            if(health < 1){
                console.log(`\tYou limp out of the Dungeon. weak from battle\n`);
                break;
            }
            
            
        }
    }
    console.log(`\t*******************************************************\n`);
    console.log(`\t#the ${enemy} has been defeated#`);
    console.log(`\t# You have ${health} HP left#`)
    if(getRandomNumber(1, 100) < healthPotionDropChance){
        numHealthPotions++;
        console.log(`\t # The ${enemy} has been defeated. #`);
        console.log(`\t # You now have ${numHealthPotions} health potion(s) #`);
    };    
    let stateControl = await inquirer.prompt({
        message: "\t What would you like to do?",
        type: "list",
        choices: ["\tcontinue Fighting", "Exit Dungeon"],
        name: "command",
    });
    if(stateControl == "\tcontinue Fighting"){
        console.log(`\t You can continue your adventure !`)
    }
    else{
        console.log(`\tYou exit the Dungeon. successful from your adventure.`);
        break;
    }


}
console.log(`\t**********************************************************`);
console.log(`\tTHANK YOU FOR PLAYING`);
console.log(`\t**********************************************************`);