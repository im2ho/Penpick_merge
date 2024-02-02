package com.penpick.users.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.penpick.users.model.Users;
import com.penpick.users.service.MailService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MailController {

    private final MailService mailService;

//    @ResponseBody
//    @PostMapping("/mail")
//    public String mailSend(@RequestBody Map<String, String> requestBody){    	
//    	
//    	String mail = requestBody.get("mail");
//        // MailService 객체 생성 시 javaMailSender를 주입하지 않아도 됨
//        int number = mailService.sendMail(mail);
//        return String.valueOf(number);
//    }
    
    @ResponseBody
    @PostMapping("/mail")
    public String mailSend(@RequestBody Map<String, String> requestBody){    	
    	
    	String mail = requestBody.get("mail");
        
    	//이메일 중복 체크
    	Optional<Users> user = mailService.FindUserByEmail(mail);
    	
    	//이미 사용중인 계정일 경우...
    	if(user.isPresent()) {
    		
    		Users existUser = user.get();
    		String userToken = existUser.getAccess_token();
    		
    		//access_token의 유무로 이메일 유저, 카카오 로그인 유저 구별 가능
    		if(userToken == null) {
    			return "existUser";
    		} else {
    			return "kakaoUser";
    		}
    		
    	}
    	
        int number = mailService.sendMail(mail);
        return String.valueOf(number);
    }

}