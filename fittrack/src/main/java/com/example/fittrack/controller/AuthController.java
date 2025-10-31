package com.example.fittrack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.fittrack.model.User;
import com.example.fittrack.service.UserService;

@Controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        return "signup";
    }
    
    @PostMapping("/signup")
    public String registerUser(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            Model model) {
        
        try {
            User newUser = userService.registerUser(username, email, password);
            model.addAttribute("message", "Registration successful! You can now log in.");
            return "login";
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return "signup";
        }
    }
    
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }
    
    @PostMapping("/login")
    public String loginUser(
            @RequestParam String username,
            @RequestParam String password,
            Model model) {
        
        if (userService.authenticateUser(username, password)) {
            // Successful login - redirect to dashboard or home page
            return "redirect:/dashboard"; // You can change this to your desired redirect page
        } else {
            // Failed login - show error message
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
}