// Megan L., Kalkidan T., Kim T.
// CSE 143
// Final Project: Food Finder
// This Server class runs the program on a website
import java.util.*;
import java.io.*;
import java.net.*;
import java.nio.file.*;

import com.sun.net.httpserver.*;

public class Server {
    private static final String QUERY_TEMPLATE = "{\"items\":[%s]}";

    // Runs the web app
    public static void main(String[] args) throws FileNotFoundException, IOException {
        Autocomplete autocomplete = new Autocomplete("/home/FoodBankList.csv");
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 100);
        server.createContext("/", (HttpExchange t) -> {
            String html = Files.readString(Paths.get("index.html"));
            send(t, "text/html; charset=utf-8", html);
        });
        server.createContext("/query", (HttpExchange t) -> {
            String s = parse("s", t.getRequestURI().getQuery().split("&"));
            if (s.equals("")) {
                send(t, "application/json", String.format(QUERY_TEMPLATE, ""));
                return;
            }
            List<String> cityResults = autocomplete.allCityMatches(s);
            if (cityResults.size() > 5) {
                cityResults = cityResults.subList(0, 5);
            }
            FoodBank selectedFoodBank = autocomplete.hasFoodBank(s);
            if (autocomplete.hasCity(s)) {
                // Display food banks in city has been selected
                List<FoodBank> foodBankResults = autocomplete.allFoodBankMatches(s);
                send(t, "application/json", String.format(QUERY_TEMPLATE, foodBankJson(foodBankResults)));
            } else if (selectedFoodBank != null){
                send(t, "application/json", String.format(QUERY_TEMPLATE, foodBankDataJson(selectedFoodBank)));
                
            } else {
                // Keep prompting user for a city
                send(t, "application/json", String.format(QUERY_TEMPLATE, cityJson(cityResults)));
            }
        });
        server.setExecutor(null);
        server.start();
    }

    // pre: Takes a String "key" that's the query the user is altering
    //      and String(s) "params" what the user wants the "key" to be
    // post: Returns a String containing the user's input
    private static String parse(String key, String... params) {
        for (String param : params) {
            String[] pair = param.split("=");
            if (pair.length == 2 && pair[0].equals(key)) {
                return pair[1];
            }
        }
        return "";
    }

    // Sends the information to the website
    private static void send(HttpExchange t, String contentType, String data)
            throws IOException, UnsupportedEncodingException {
        t.getResponseHeaders().set("Content-Type", contentType);
        byte[] response = data.getBytes("UTF-8");
        t.sendResponseHeaders(200, response.length);
        try (OutputStream os = t.getResponseBody()) {
            os.write(response);
        }
    }

    // Returns a String in JSON format of all the possible cities the user might select
    private static String cityJson(List<String> matches) {
        StringBuilder results = new StringBuilder();
        for (String city : matches) {
            if (results.length() > 0) {
                results.append(',');
            }
            results.append('{');
            results.append("\"city\":\"").append(city).append("\"");
            results.append('}');
        }
        return results.toString();
    }

    // Returns a String in JSON format of all the food banks in the city selected
    private static String foodBankJson(List<FoodBank> matches) {
        StringBuilder results = new StringBuilder();
        for (FoodBank foodBank : matches) {
            if (results.length() > 0) {
                results.append(',');
            }
            results.append('{');
            results.append("\"foodBankName\":\"").append(foodBank.getName()).append("\"");
            results.append('}');
        }
        return results.toString();
    }

    // Returns a String in JSON format containing information on the Food Bank selected
    private static String foodBankDataJson(FoodBank foodBank) {
        StringBuilder results = new StringBuilder();
        results.append('{');
        results.append("\"name\":\"").append(foodBank.getName()).append("\"");
        results.append('}');
        results.append(',');
        results.append('{');
        results.append("\"address\":\"").append(foodBank.getAddress()).append("\"");
        results.append('}');
        results.append(',');
        results.append('{');
        results.append("\"phone\":\"").append(foodBank.getPhoneNumber()).append("\"");
        results.append('}');
        results.append(',');
        results.append('{');
        results.append("\"href\":\"").append(foodBank.getWebsite()).append("\"");
        results.append('}');
        results.append(',');
        results.append('{');
        results.append("\"image\":\"").append(foodBank.getImage()).append("\"");
        results.append('}');
        return results.toString();
    }
}
