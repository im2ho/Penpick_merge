package com.penpick.users.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MailService {

	@Autowired
	private final UserRepository userRepository;
	
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "tpgml0816@gmail.com";

    //인증번호 생성
    public int createNumber() {
        return (int) (Math.random() * 90000) + 100000;
    }

    //메일 양식
    public MimeMessage createMail(String mail) {
        int number = createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(mail));
            message.setSubject("PenPick 가입 인증");
            String body = "<h3>PenPick 회원가입 인증 번호입니다.</h3><h1>" + number + "</h1><h3>감사합니다.</h3>";
            message.setContent(body, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    //메일 발송
    public int sendMail(String mail) {
        MimeMessage message = createMail(mail);
        javaMailSender.send(message);
        return createNumber();
    }
    
    //이메일 조회
  	public Optional<Users> FindUserByEmail(String userEmail){
  		return userRepository.findByUserEmail(userEmail);
  	}
    
}

