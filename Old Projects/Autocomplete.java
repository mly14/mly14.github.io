// Megan L., Kalkidan T., Kim T.
// CSE 143
// Final Project: Food Finder
// This Autocomplete class helps the website understand the user's 
// input in the website
import java.util.*;
import java.util.stream.*;
import java.io.*;

public class Autocomplete {
    private final Map<String, List<FoodBank>> cityFoodBanks;

    // Constructor
    public Autocomplete(String filename) throws FileNotFoundException {
        cityFoodBanks = new HashMap<>();
        try (Scanner fileInput = new Scanner(new File(filename))) { 
            while (fileInput.hasNextLine()) {
                FoodBank foodBank = FoodBank.fromCsv(fileInput.nextLine());
                String foodBankLocation = foodBank.getCity();
                if (!cityFoodBanks.containsKey(foodBankLocation)) {
                    cityFoodBanks.put(foodBankLocation, new ArrayList<>());
                }
                cityFoodBanks.get(foodBankLocation).add(foodBank);
            }
        } 
    }

    // Returns a List of Strings with all the terms that start with the given prefix
    public List<String> allCityMatches(String prefix) {
          if (prefix == null || prefix.length() == 0) {
            return List.of();
        }
        // Modify prefix so that the user doesn't have to worry about case
        String adjustedPrefix = prefix.substring(0, 1).toUpperCase() + 
                                prefix.substring(1).toLowerCase();
        return cityFoodBanks.keySet()
                          .stream()
                          .filter(city -> city.startsWith(adjustedPrefix))
                          .collect(Collectors.toList());
    }

    // Returns true if the passed String is a valid city
    // Returns false otherwise
    public boolean hasCity(String result) {
        return cityFoodBanks.containsKey(result);
    }

    // Returns true if the passed String is the name of a valid food bank 
    // Returns false otherwise
    // Method isn't used in the Server.java we have now
    public FoodBank hasFoodBank(String name) {
        for (String key : cityFoodBanks.keySet()) {
            List<FoodBank> foodBanks = cityFoodBanks.get(key);
            for (int i = 0; i < foodBanks.size(); i++) {
                if (foodBanks.get(i).getName().equals(name))
                    return foodBanks.get(i);
            }
        }
        return null;
    }


    // Returns a List of FoodBank objects from the city user entered/selected
    public List<FoodBank> allFoodBankMatches(String city) {
        if (city == null || city.length() == 0) {
            return List.of();
        }
        return cityFoodBanks.get(city); 
    }
}
