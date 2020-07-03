package com.arvato.coffeeservice.load;

import com.arvato.coffeeservice.models.Product;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Component
public class ProductLoader {

    private static final String PRODUCT_FILE = "products.json";

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<List<Product>> importProducts() throws IOException {
        URL resource = ProductLoader.class.getClassLoader().getResource(PRODUCT_FILE);
        JsonParser parser = new ObjectMapper().createParser(resource);
        List<Product> products = parser.readValueAs(new TypeReference<List<Product>>() {});
        return CompletableFuture.completedFuture(products);
    }
}