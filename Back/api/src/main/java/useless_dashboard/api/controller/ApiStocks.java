package useless_dashboard.api.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/Stocks")
public class ApiStocks {
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public ResponseEntity<?> getStocks() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=tsla&outputsize=compact&apikey=EOSDO58H9WPBPZIO"))
		// https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=TSLA&datatype=json&apikey=EOSDO58H9WPBPZIO
		// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=15&datatype=json&outputsize=compact&apikey=EOSDO58H9WPBPZIO
		.header("accept", "application/json")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return ResponseEntity.ok(response.body());
    }
}
