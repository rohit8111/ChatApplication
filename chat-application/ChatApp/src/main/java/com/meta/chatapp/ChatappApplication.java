package com.meta.chatapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import com.meta.chatapp.repository.UsersRepository;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {
		SecurityAutoConfiguration.class
})
@EnableMongoRepositories(basePackageClasses = UsersRepository.class)
public class ChatappApplication {
	private static Logger log = LogManager.getLogger(ChatappApplication.class);

	public static void main(String[] args) {
		log.info("Application is starting..");
		SpringApplication.run(ChatappApplication.class, args);
	}

}
