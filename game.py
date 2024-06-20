# create a simple rock, paper, scissors game
# provide a welcome message
# get the user's choice
# get the computer's choice
# compare the two choices
# print the results
# ask the user if they want to play again
# say goodbye and end the game
# use one function for the game  logic

import random

def play_round(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It's equal!"
    elif user_choice == "rock":
        if computer_choice == "scissors":
            return "You win!"
        else:
            return "You lose!"
    elif user_choice == "paper":
        if computer_choice == "rock":
            return "You win!"
        else:
            return "You lose!"
    elif user_choice == "scissors":
        if computer_choice == "paper":
            return "You win!"
        else:
            return "You lose!"

def game():
    print("Welcome to Rock, Paper, Scissors!")
    user_choice = input("Enter your choice: rock, paper, or scissors: ")
    computer_choice = random.choice(["rock", "paper", "scissors"])
    print(f"The computer chose {computer_choice}")
    result = play_round(user_choice, computer_choice)
    print(result)
    play_again = input("Do you want to play again? yes or no: ")
    if play_again == "yes":
        game()
    else:
        print("Goodbye!")

game()