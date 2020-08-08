package com.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web Mvc Configuration
 * 
 * @author Chiem Lam Mai
 * @since 07-09-2019
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.*")
public class WebMvcConfig implements WebMvcConfigurer {
}