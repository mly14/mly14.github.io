// Megan L., Kalkidan T., Kim T.
// CSE 143
// Final Project: Food Finder
// This FoodBank class represent a Food Bank in Washington State. 
public class FoodBank {
    private String name;
    private String address;
    private String city; 
    private String phoneNumber;
    private String website;
    private String photo;

    // Constructor
    public FoodBank(String name, String address, String city, String phoneNumber, String photo, String website) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.website = website;
        this.photo = photo;
    }

    // separate the data file
    public static FoodBank fromCsv(String commaSeparated) {
        return fromCsv(commaSeparated.split(","));
    }

    // setting each attribute from data file to object
    public static FoodBank fromCsv(String... args) {
        return new FoodBank(args[0], args[1], args[2], args[3], args[4], args[5]);
    }

    // returns the food bank's name
    public String getName() {
        return name;
    }

    // returns the food bank's address
    public String getAddress() {
        return address;
    }

    // returns the food bank's phone number
    public String getPhoneNumber() {
        return phoneNumber;
    }

    // returns the food bank's website
    public String getWebsite() {
        return website;
    }

    // returns the city the food bank is in
    public String getCity() {
        return city;
    }

    // returns image
    public String getImage() {
        return photo;
    }

    // returns a String with the food bank's name
    public String toString() {
        return name;
    }

   
}
