package com.arvato.coffeeservice.controllers;

import com.arvato.coffeeservice.models.Product;
import com.arvato.coffeeservice.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/product")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.saveAndFlush(product);
    }

    @PutMapping("/product/{id}")
    public Product updateProductById(@RequestBody Product product, @PathVariable("id") Long productId) {
        Optional<Product> productById = productRepository.findById(productId);

        if (productById.isPresent()) {
            productById.get().setName(product.getName());
            productById.get().setDescription(product.getDescription());
            productById.get().setQuantity(product.getQuantity());
            productById.get().setPrice(product.getPrice());
        }

        return productRepository.saveAndFlush(productById.get());
    }

    @DeleteMapping("/product/{id}")
    public void deleteProductById(@PathVariable("id") Long productId) {
        productRepository.deleteById(productId);
    }

}
