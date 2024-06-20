import unittest
import game  

class TestGame(unittest.TestCase):
    def test_play_round(self):
        self.assertEqual(game.play_round("rock", "scissors"), "You win!")
        self.assertEqual(game.play_round("rock", "rock"), "It's equal!")
        self.assertEqual(game.play_round("rock", "paper"), "You lose!")
        self.assertEqual(game.play_round("paper", "rock"), "You win!")
        self.assertEqual(game.play_round("paper", "paper"), "It's equal!")
        self.assertEqual(game.play_round("paper", "scissors"), "You lose!")
        self.assertEqual(game.play_round("scissors", "paper"), "You win!")
        self.assertEqual(game.play_round("scissors", "scissors"), "It's equal!")
        self.assertEqual(game.play_round("scissors", "rock"), "You lose!")

if __name__ == "__main__":
    unittest.main()