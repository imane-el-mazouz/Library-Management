package com.support_App.dto;

import lombok.*;

//@Builder
//@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AuthRequestDTO{
   private String email ;
   private String password ;

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }
}
