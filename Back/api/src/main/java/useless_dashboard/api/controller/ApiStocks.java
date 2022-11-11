package useless_dashboard.api.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/Stocks")
public class ApiStocks {
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public @ResponseBody ResponseEntity<?> getStocks(@RequestParam(required = false) String company) throws Exception {
        // If no company specified, return the stoks of TESLA(TSLA)
        String url = company == null ? "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=tsla&outputsize=compact&apikey=EOSDO58H9WPBPZIO" : "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + company + "&outputsize=compact&apikey=EOSDO58H9WPBPZIO";
        HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create(url))
		// https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=TSLA&datatype=json&apikey=EOSDO58H9WPBPZIO
		// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=15&datatype=json&outputsize=compact&apikey=EOSDO58H9WPBPZIO
		.header("accept", "application/json")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return ResponseEntity.ok(response.body());
    }
}
