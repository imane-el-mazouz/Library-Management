package com.support_App;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class MyConfiguration implements WebMvcConfigurer {

//  @Bean
//  public CorsFilter corsFilter() {
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//    CorsConfiguration config = new CorsConfiguration();
//    config.setAllowCredentials(true);
//    config.addAllowedOrigin("http://localhost:4200");
//    config.addAllowedHeader("*");
//    config.addAllowedMethod("*");
//    source.registerCorsConfiguration("/api/users/**", config);
//    source.registerCorsConfiguration("/api/account/**", config);
//    source.registerCorsConfiguration("/api/auth/**", config);
//    source.registerCorsConfiguration("/api/auth/login", config);
//
//    return new CorsFilter(source);
//  }

  //    @Bean
//    public CorsFilter corsFilter() {
//      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//      CorsConfiguration config = new CorsConfiguration();
//      config.setAllowCredentials(true);
//      config.addAllowedOrigin("http://localhost:4200");
//      config.addAllowedHeader("*");
//      config.addAllowedMethod("*");
//      source.registerCorsConfiguration("/**", config);
//      return new CorsFilter(source);
//    }
//  }
//@Override
//public void addCorsMappings(CorsRegistry registry) {
//  registry.addMapping("/**")
//    .allowedOrigins("http://localhost:4200")
//    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//    .allowedHeaders("*");
//}
//
//
////  public void addCorsMappings(CorsRegistry registry) {
////    registry.addMapping("/api/**")
////      .allowedOrigins("http://localhost:4200")
////      .allowedMethods("GET", "POST", "PUT", "DELETE")
////      .allowedHeaders("*")
////      .allowCredentials(true);
////  }
  @Configuration
  public static class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")
              .allowedOrigins("*")
              .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
              .allowedHeaders("*");
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
      configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
      configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
      configuration.setExposedHeaders(Arrays.asList("Authorization"));
      configuration.setAllowCredentials(true);
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
    }


  }
}
